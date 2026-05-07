# Training Plan: .NET Beginner → XiD Async API Developer

> Dành cho dev chưa biết gì về .NET. Mục tiêu: sau 6-8 tuần có thể đọc hiểu, sửa bug, thêm feature cho dự án.

---

## Phase 1: C# & .NET Fundamentals (Tuần 1-2)

### Tuần 1: C# Basics

**Mục tiêu:** Đọc hiểu syntax C#, viết được chương trình đơn giản.

| Ngày | Chủ đề | Tài liệu |
|------|--------|-----------|
| 1 | Setup VS Code + .NET SDK, Hello World, data types, variables | [MS Learn: C# First Steps](https://learn.microsoft.com/en-us/dotnet/csharp/tour-of-csharp/) |
| 2 | Control flow (if/switch/for/while), methods, parameters | [MS Learn: C# Basics](https://learn.microsoft.com/en-us/training/paths/csharp-first-steps/) |
| 3 | Classes, objects, properties, constructors, access modifiers | [MS Learn: OOP in C#](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/tutorials/oop) |
| 4 | Inheritance, interfaces, abstract classes, virtual/override | Áp dụng: đọc `IEntity<TKey>`, `IAudit`, `AuditBase` trong `XID.Sync.Domain` |
| 5 | Generics (`List<T>`, `Repository<T>`), LINQ basics (`Where`, `Select`, `FirstOrDefault`) | Áp dụng: đọc `IRepository<TEntity>` trong `XID.Sync.Data` |

**Bài tập:** Tạo console app quản lý danh sách nhân viên với class, interface, LINQ.

### Tuần 2: C# Nâng cao + .NET Core Basics

| Ngày | Chủ đề | Tài liệu |
|------|--------|-----------|
| 1 | Async/await, Task, Task<T> | [MS Learn: Async](https://learn.microsoft.com/en-us/dotnet/csharp/asynchronous-programming/) |
| 2 | Dependency Injection (DI) — concept + built-in DI container | [MS Learn: DI](https://learn.microsoft.com/en-us/dotnet/core/extensions/dependency-injection) |
| 3 | Nullable reference types, pattern matching | Áp dụng: hiểu `<Nullable>enable</Nullable>` và các warning khi build project |
| 4 | NuGet packages, .csproj structure, solution/project relationship | Áp dụng: đọc `XID.Sync.API.csproj`, `XID.Sync.API.sln` |
| 5 | Tổng hợp: đọc & chạy thử XiD project lần đầu | Follow `docs/build-and-run-ubuntu.md` |

**Bài tập:** Chạy thành công project, mở Swagger UI, thử gọi 1 API endpoint.

---

## Phase 2: ASP.NET Core Web API (Tuần 3-4)

### Tuần 3: Web API Fundamentals

| Ngày | Chủ đề | Liên hệ dự án |
|------|--------|----------------|
| 1 | Tạo ASP.NET Web API từ đầu: Controller, routing, HTTP methods | Đọc `CompanyController.cs` — CRUD đơn giản nhất |
| 2 | `Startup.cs` vs `Program.cs`, middleware pipeline | Đọc `XID.Sync.API/Startup.cs` — hiểu flow ConfigureServices → Configure |
| 3 | Model binding, DTO pattern, request/response | Đọc `XID.Sync.Dtos/` — so sánh DTO vs Entity |
| 4 | API versioning (`/api/v1/`, `/api/v2/`) | Dự án dùng `Microsoft.AspNetCore.Mvc.Versioning` — xem `[ApiVersion("1.0")]` trên controllers |
| 5 | Swagger/OpenAPI, test API bằng Swagger UI | Mở `http://localhost:8098/swagger`, thử các endpoint |

**Bài tập:** Thêm 1 endpoint GET mới vào `CompanyController` trả về company count.

### Tuần 4: Authentication & Middleware

| Ngày | Chủ đề | Liên hệ dự án |
|------|--------|----------------|
| 1 | JWT Authentication: concept, token structure | Đọc `AuthService.cs` — JWT token generation |
| 2 | `[Authorize]` attribute, Claims, ClaimsPrincipal | Đọc `BaseController.cs` — cách extract user claims từ JWT |
| 3 | Custom Middleware | Đọc `ApiKeyMiddleware.cs` — V2 API dùng API key thay JWT |
| 4 | CORS, error handling, status codes | Xem CORS config trong `Startup.cs` ("AllowAll" policy) |
| 5 | Multi-tenancy concept | Dự án dùng `tenant` claim trong JWT → mỗi request biết thuộc tenant nào |

**Bài tập:** Login qua `/api/v2/Auth/Login`, lấy JWT token, gọi V1 API với Bearer token.

---

## Phase 3: Entity Framework Core & Database (Tuần 5)

| Ngày | Chủ đề | Liên hệ dự án |
|------|--------|----------------|
| 1 | EF Core basics: DbContext, DbSet, entity mapping | Đọc `XIDDbContext.cs` — 50+ entity mappings |
| 2 | Migrations: tạo, apply, rollback | Đọc `XID.Sync.Build/Migrations/` — cách project quản lý DB schema |
| 3 | Repository pattern + Unit of Work | Đọc `Repository<T>` trong `XID.Sync.Data/Repositories/` |
| 4 | Querying: LINQ to EF, Include (eager loading), lazy loading proxies | Dự án bật `UseLazyLoadingProxies()` — hiểu khi nào cần `.Include()` |
| 5 | Transactions, auditing | Đọc `UnitOfWork.cs` — `BeginTransactionAsync`, `SaveChangesAsync` tự fill audit fields |

**File quan trọng cần đọc kỹ:**
- `XID.Sync.Data/EF/XIDDbContext.cs` — main DbContext
- `XID.Sync.Data/Repositories/Repository.cs` — generic repository
- `XID.Sync.Data/Uow/UnitOfWork.cs` — unit of work

**Bài tập:** Viết 1 service method query `Device` có pagination dùng `GetPagedListAsync()`.

---

## Phase 4: Kiến trúc dự án chuyên sâu (Tuần 6)

### Hiểu kiến trúc tổng thể

```
Request → Controller → Service → UnitOfWork → Repository → DbContext → PostgreSQL
                ↑                      ↑
            JWT/ApiKey            DI Container
```

### Các layer cần hiểu:

| Layer | Folder | Vai trò |
|-------|--------|---------|
| **API** | `XID.Sync.API/` | Nhận request, routing, auth, trả response |
| **Services** | `XID.Sync.Sevices/` | Business logic, gọi repository |
| **Data** | `XID.Sync.Data/` | Repository, UnitOfWork, DbContext |
| **Domain** | `XID.Sync.Domain/` | Entity models (POCO) |
| **DTOs** | `XID.Sync.Dtos/` | Request/response objects |
| **Security** | `XID.Sync.Security/` | Email, authorization handlers |
| **Commons** | `XID.Sync.Commons/` | Shared utilities, constants |

### Bài tập tuần 6:

1. **Trace full flow:** Từ `POST /api/v1/Device/Search` → `DeviceController` → `DeviceService` → `DeviceRepository` → DB. Vẽ sequence diagram.
2. **Trace DI registration:** Từ `Startup.cs` → `ServiceCollectionExtension.cs` → hiểu service nào được inject vào đâu.
3. **Trace entity relationships:** `User` → `UserAccessLevel` → `AccessLevel` → `DeviceAccessLevel` → `Device`.

---

## Phase 5: Tính năng nâng cao (Tuần 7)

| Ngày | Chủ đề | Liên hệ dự án |
|------|--------|----------------|
| 1 | Quartz.NET — scheduled jobs | Đọc `XID.Sync.Services/ScheduledTasks/Jobs/` — 5 jobs |
| 2 | Device integration: ZKTeco protocol | Đọc `ZkTecoService.cs` — TCP listening port 8088, push commands |
| 3 | Device integration: HIKvision API | Đọc `HIKvisionService.cs` — HTTP API integration |
| 4 | CSV export, image processing | Đọc `RealTimeLogController` (CSV export), `ImageHelper` (face resize) |
| 5 | Multi-schema database, tenant isolation | Đọc `DbSchemaAwareMigrationAssembly`, `IDbContextSchema` |

**Quartz Jobs cần hiểu:**

| Job | Schedule | Chức năng |
|-----|----------|-----------|
| `JobMandayLogs` | 1 PM daily | Pull attendance logs |
| `JobHIKDeviceCmds` | 15 phút/lần | Gửi commands tới HIK devices |
| `JobPullUserHIKDevice` | 5 phút/lần | Sync user data từ HIK |
| `JobPullEventHIKDevice` | 3 phút/lần | Sync events từ HIK |
| `JobCleanupDeviceCmds` | 2 AM daily | Cleanup old commands |

---

## Phase 6: Thực hành thực tế (Tuần 8)

### Mini-tasks để luyện tập (từ dễ → khó):

1. **[Easy]** Thêm field `Description` vào entity `Company`, tạo migration, update DTO
2. **[Easy]** Thêm endpoint `GET /api/v1/Dashboard/DeviceCount` trả về tổng số device
3. **[Medium]** Thêm filter theo `DeviceSupplier` (ZKTeco/HIKvision) vào endpoint search device
4. **[Medium]** Tạo endpoint export CSV danh sách nhân viên (`UserInfo`)
5. **[Hard]** Tạo service + controller mới cho quản lý `Holiday` (CRUD + assign vào `AccessLevel`)
6. **[Hard]** Debug: trace tại sao 1 device command không được gửi (đọc `DeviceCmds` → `ProcessedDeviceCmds` flow)

---

## Tài liệu tham khảo

### Bắt buộc đọc
- [Microsoft Learn: C# Fundamentals](https://learn.microsoft.com/en-us/dotnet/csharp/tour-of-csharp/)
- [Microsoft Learn: ASP.NET Core Web API](https://learn.microsoft.com/en-us/aspnet/core/web-api/)
- [Microsoft Learn: EF Core](https://learn.microsoft.com/en-us/ef/core/)

### Nên đọc
- [Repository + Unit of Work pattern](https://learn.microsoft.com/en-us/aspnet/mvc/overview/older-versions/getting-started-with-ef-5-using-mvc-4/implementing-the-repository-and-unit-of-work-patterns-in-an-asp-net-mvc-application)
- [JWT Authentication in ASP.NET Core](https://learn.microsoft.com/en-us/aspnet/core/security/authentication/)
- [Quartz.NET Documentation](https://www.quartz-scheduler.net/documentation/)

### Video (tiếng Việt)
- Search YouTube: "ASP.NET Core Web API tutorial tiếng Việt"
- Search YouTube: "Entity Framework Core cơ bản"

---

## Checklist đánh giá

Sau 8 tuần, dev cần tự trả lời được:

- [ ] Giải thích luồng 1 request từ Swagger → DB → response
- [ ] Tạo 1 entity mới + migration + repository + service + controller
- [ ] Giải thích DI lifetime: Singleton vs Scoped vs Transient
- [ ] Phân biệt lazy loading vs eager loading, khi nào dùng `.Include()`
- [ ] Đọc hiểu 1 Quartz job và giải thích nó làm gì
- [ ] Debug 1 bug đơn giản bằng cách đọc logs + trace code
- [ ] Giải thích multi-tenant hoạt động thế nào trong dự án
- [ ] Build & run project trên máy local (cả native và Docker)
