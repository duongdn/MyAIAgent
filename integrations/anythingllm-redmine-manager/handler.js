const META_ENDPOINTS = {
  projects: "/projects.json",
  trackers: "/trackers.json",
  statuses: "/issue_statuses.json",
  priorities: "/enumerations/issue_priorities.json",
};

module.exports.runtime = {
  handler: async function ({
    action,
    issue_id,
    project_id,
    subject,
    description,
    tracker_id,
    priority_id,
    status_id,
    assigned_to_id,
    notes,
    limit,
    meta_type,
  } = {}) {
    try {
      const baseUrl = (this.runtimeArgs.REDMINE_URL || "").replace(/\/+$/, "");
      const apiKey = this.runtimeArgs.REDMINE_API_KEY;
      if (!baseUrl || !apiKey) {
        return "Redmine chưa được cấu hình: thiếu REDMINE_URL hoặc REDMINE_API_KEY trong skill settings.";
      }

      const request = async (path, { method = "GET", query, body } = {}) => {
        let url = `${baseUrl}${path}`;
        if (query) {
          const qs = new URLSearchParams();
          for (const [key, value] of Object.entries(query)) {
            if (value !== undefined && value !== null && value !== "") qs.set(key, value);
          }
          const qsString = qs.toString();
          if (qsString) url += `?${qsString}`;
        }
        this.logger(`Redmine ${method} ${url}`);
        const res = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
            "X-Redmine-API-Key": apiKey,
          },
          body: body ? JSON.stringify(body) : undefined,
        });
        const text = await res.text();
        const data = text ? JSON.parse(text) : null;
        if (!res.ok) {
          const errors = data?.errors ? data.errors.join("; ") : text || res.statusText;
          throw new Error(`Redmine trả về HTTP ${res.status}: ${errors}`);
        }
        return data;
      };

      switch (action) {
        case "meta": {
          const path = META_ENDPOINTS[meta_type];
          if (!path) {
            return `meta_type không hợp lệ. Dùng một trong: ${Object.keys(META_ENDPOINTS).join(", ")}.`;
          }
          const data = await request(path);
          const list = data[meta_type] || data.issue_statuses || data.issue_priorities || [];
          if (!list.length) return `Không tìm thấy ${meta_type} nào.`;
          return list.map((item) => `${item.id}: ${item.name}`).join("\n");
        }

        case "create": {
          if (!project_id || !subject) {
            return "Thiếu project_id hoặc subject — cả hai đều bắt buộc khi tạo issue.";
          }
          this.introspect(`Đang tạo issue "${subject}" trong project ${project_id}...`);
          const issue = {
            project_id,
            subject,
            description,
            tracker_id,
            priority_id,
            status_id,
            assigned_to_id,
          };
          Object.keys(issue).forEach((k) => issue[k] === undefined && delete issue[k]);
          const data = await request("/issues.json", { method: "POST", body: { issue } });
          const created = data.issue;
          return `Đã tạo issue #${created.id}: "${created.subject}" — ${baseUrl}/issues/${created.id}`;
        }

        case "read": {
          if (!issue_id) return "Thiếu issue_id.";
          const data = await request(`/issues/${issue_id}.json`, { query: { include: "journals" } });
          const i = data.issue;
          const lines = [
            `#${i.id} [${i.status.name}] ${i.subject}`,
            `Project: ${i.project.name} | Tracker: ${i.tracker.name} | Priority: ${i.priority.name}`,
            `Assignee: ${i.assigned_to ? i.assigned_to.name : "(chưa gán)"}`,
            `Mô tả: ${i.description || "(không có)"}`,
          ];
          const notesJournals = (i.journals || []).filter((j) => j.notes);
          if (notesJournals.length) {
            lines.push("Ghi chú gần nhất:");
            notesJournals.slice(-5).forEach((j) => {
              lines.push(`- [${j.created_on}] ${j.user.name}: ${j.notes}`);
            });
          }
          return lines.join("\n");
        }

        case "update": {
          if (!issue_id) return "Thiếu issue_id.";
          const approval = await this.requestToolApproval({
            description: `Cập nhật issue #${issue_id}${status_id ? ` (status_id=${status_id})` : ""}${notes ? " kèm ghi chú" : ""}`,
            payload: { issue_id, status_id, priority_id, assigned_to_id, notes },
          });
          if (!approval.approved) return approval.message || "Người dùng đã từ chối cập nhật.";

          const issue = { status_id, priority_id, assigned_to_id, notes };
          Object.keys(issue).forEach((k) => issue[k] === undefined && delete issue[k]);
          if (!Object.keys(issue).length) return "Không có trường nào để cập nhật.";
          await request(`/issues/${issue_id}.json`, { method: "PUT", body: { issue } });
          return `Đã cập nhật issue #${issue_id} — ${baseUrl}/issues/${issue_id}`;
        }

        case "delete": {
          if (!issue_id) return "Thiếu issue_id.";
          const approval = await this.requestToolApproval({
            description: `XOÁ issue #${issue_id} — hành động không thể hoàn tác`,
            payload: { issue_id },
          });
          if (!approval.approved) return approval.message || "Người dùng đã từ chối xoá issue.";
          await request(`/issues/${issue_id}.json`, { method: "DELETE" });
          return `Đã xoá issue #${issue_id}.`;
        }

        case "list": {
          const data = await request("/issues.json", {
            query: {
              project_id,
              status_id,
              assigned_to_id,
              limit: limit || 25,
            },
          });
          if (!data.issues.length) return "Không có issue nào khớp điều kiện.";
          return data.issues
            .map((i) => `#${i.id} [${i.status.name}] ${i.subject} (${i.project.name})`)
            .join("\n");
        }

        default:
          return `action không hợp lệ: "${action}". Dùng một trong: create, read, update, delete, list, meta.`;
      }
    } catch (error) {
      this.logger(`Redmine skill error: ${error.message}`);
      return `Lỗi khi thao tác với Redmine: ${error.message}`;
    }
  },
};
