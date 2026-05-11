"""
Create NUS Angular Training Plan Google Sheet mirroring the React plan structure.

Source ref: https://docs.google.com/spreadsheets/d/1OI41xkOizDMqRwsuzx3p9JxQ0qizNAqTbirDaa-1lRY
Target audience: NUS new + experienced devs starting on Angular projects.
Angular target version: 18+ (standalone components, signals, control flow, esbuild).
"""

import googleapiclient.discovery as gd
from google.oauth2 import service_account

SA_PATH = 'config/daily-agent-490610-7eb7985b33e3.json'
SHARE_WITH = 'dnduong.us@gmail.com'

SCOPES = [
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive',
]

creds = service_account.Credentials.from_service_account_file(SA_PATH, scopes=SCOPES)
sheets = gd.build('sheets', 'v4', credentials=creds).spreadsheets()
drive = gd.build('drive', 'v3', credentials=creds)

# ----------------------------------------------------------------------------
# Content rows (Content tab) — section headers + lessons mirroring React plan.
# Columns: A=No, B=Training Contents, C=Objectives, D=Method, E=Trainer/Mentor,
# F=Trainee, G=Required?, H=Expected Training Period, I=Duration (hour),
# J=Start Date, K=End Date, L=Reference / Materials, M=Status Training,
# N=Exam content, O=Exam result, P=Reviewer Interview content, Q=Result, R=Notes.

METHOD = 'Self-training and Mentoring'
TRAINER = 'Technical Advisor'
NEW = 'New member'
EXP = 'Experienced member'

CONTENT_ROWS = []  # list of full row arrays


def section(no, title):
    CONTENT_ROWS.append([no, title])


def lesson(no, title, objectives, trainee, required, hours, refs):
    CONTENT_ROWS.append([
        no, title, objectives, METHOD, TRAINER, trainee, required,
        'N/A', hours, '', '', refs,
    ])


# Header preamble rows mirroring React (rows 2..8 in the React Content tab)
PREAMBLE = [
    [],  # R1 blank
    ['Training Plan'],  # R2
    [],  # R3 blank
    ['', '', '', '', '', '', '', '', '', 'Total (working days)', '7.5'],  # R4
    [
        'No', 'Training Contents', 'Objectives', 'Method', 'Trainer / Mentor',
        'Trainee', 'Required?', 'Expected Training Period', 'Duration (hour)',
        'Start Date', 'End Date', 'Reference / Materials', 'Status Training',
        'Exam/Test', '', 'Reviewer Interview', '', 'Notes',
    ],  # R5
    ['', '', '', '', '', '', '', '', '', '', '', '', '', 'Content', 'Result', 'Content', 'Result'],  # R6
    [
        '', '', '', '', '', '',
        '- Trainer sẽ đánh giá kiến thức trainee, những nội dung nào cần train thì chọn Yes, nội dung nào tự xem thì chọn No.',
        '', '- Nếu Trainee off ngoài plan thì insert thêm dòng, thêm số giờ off.',
        '- Ghi start date vào ô đầu tiên (J9).\n- Những dòng còn lại sẽ tự động tính theo công thức có sẵn.',
        '- Các ô sẽ tự động tính theo công thức có sẵn.',
        '', 'Choose: Not started, in progress, done',
        'Ex: Git, TypeScript & ES6, RxJS Toolbox', 'Choose: Pass/ fail',
        'Ex: Git + Security & Intelligence Property, TypeScript + RxJS',
        'Choose: Pass, fail', 'Necessary note',
    ],  # R7
    ['', '', 'Buổi sáng đầu tiên:\n- Tiếp đón lúc 9h\n- HR/Admin/IT training: 3h\n→ Total 4h buổi sáng này KHÔNG tính vào giờ Training Plan',
     '', '', '', 'Yes', '', 4, 'May 11, 2026', 'May 11, 2026'],  # R8
]

# ============================================================================
# Section 1 — Prerequisite
section('1', 'Prerequisite')
lesson('1.1', 'TypeScript Essentials',
       '- TypeScript vs JavaScript\n- Types, interfaces, generics, enums\n- Decorators (used heavily by Angular)\n- strict mode, never/unknown\n- tsconfig.json basics',
       NEW, 'Yes', 3,
       'https://www.typescriptlang.org/docs/handbook/intro.html\nhttps://angular.dev/best-practices/style-guide')
lesson('1.2', 'NPM / Yarn / pnpm',
       "- What's NodeJS and NPM?\n- package.json, lockfiles\n- Install / update / remove packages\n- npx vs npm scripts\n- semver ranges",
       NEW, 'Yes', 2,
       'https://www.npmjs.com/\nhttps://yarnpkg.com/\nhttps://pnpm.io/')
lesson('1.3', 'NVM',
       '- What and why NVM (manage Node versions per project)\n- Install NVM\n- Install / switch Node versions\n- .nvmrc file',
       NEW, 'Yes', 2,
       'https://github.com/nvm-sh/nvm')
lesson('1.4', 'Angular CLI',
       '- Install Angular CLI globally\n- ng new, ng generate, ng serve, ng build, ng test\n- Workspace layout (angular.json, projects)\n- ng update for version migrations',
       NEW, 'Yes', 2,
       'https://angular.dev/tools/cli\nhttps://angular.dev/cli')

# Section 2 — Angular Basic
section('2', 'Angular Basic')
lesson('2.1', 'Getting Started',
       "- What's Single Page App, Angular?\n- Walk through angular.dev tutorial\n- Create a standalone Angular app via ng new\n- Project structure: app, main.ts, bootstrap",
       NEW, 'Yes', 2,
       'https://angular.dev/tutorials\nhttps://angular.dev/guide/standalone-components')
lesson('2.2', 'Components & Templates',
       "- What's a component? @Component decorator\n- Standalone vs NgModule (use standalone)\n- Template syntax & inline templates\n- Component file split (.ts, .html, .scss)\n- Selectors and component metadata",
       NEW, 'Yes', 4,
       'https://angular.dev/guide/components\nhttps://angular.dev/guide/templates')
lesson('2.3', 'Data Binding & Control Flow',
       '- Interpolation {{ }}\n- Property binding [prop]\n- Event binding (event)\n- Two-way binding [(ngModel)]\n- New control flow @if / @for / @switch (Angular 17+) vs *ngIf/*ngFor (legacy)',
       NEW, 'Yes', 4,
       'https://angular.dev/guide/templates/binding\nhttps://angular.dev/guide/templates/control-flow')
lesson('2.4', 'Directives',
       '- Built-in attribute directives (ngClass, ngStyle, ngModel)\n- Built-in structural directives (legacy *ngIf, *ngFor) — when to still use vs new control flow\n- Custom attribute directive\n- Custom structural directive (advanced)',
       NEW, 'Yes', 2,
       'https://angular.dev/guide/directives\nhttps://angular.dev/guide/directives/attribute-directives')
lesson('2.5', 'Pipes',
       '- Built-in pipes (date, currency, async, json, slice)\n- Pure vs impure pipes\n- Custom pipe creation\n- Async pipe with Observables / signals',
       NEW, 'Yes', 1,
       'https://angular.dev/guide/pipes')
lesson('2.6', 'Services & Dependency Injection',
       "- What's a Service? @Injectable\n- providedIn: 'root' vs component-scoped\n- Constructor injection vs inject() function\n- Hierarchical injectors\n- Tree-shakable providers",
       NEW, 'Yes', 3,
       'https://angular.dev/guide/di\nhttps://angular.dev/api/core/inject')
lesson('2.7', 'Lifecycle Hooks',
       '- ngOnInit, ngOnChanges, ngOnDestroy, ngAfterViewInit, ngAfterContentInit\n- When each fires (mental model)\n- Cleanup in ngOnDestroy (subscriptions, timers)\n- DestroyRef + takeUntilDestroyed (Angular 16+)',
       NEW, 'Yes', 2,
       'https://angular.dev/guide/components/lifecycle\nhttps://angular.dev/api/core/DestroyRef')
lesson('2.8', 'Component Communication',
       '- @Input / @Output decorators\n- New signal-based input() / output() (Angular 17.1+)\n- model() for two-way binding\n- ViewChild / ContentChild',
       NEW, 'Yes', 2,
       'https://angular.dev/guide/signals/inputs\nhttps://angular.dev/guide/components/inputs')
lesson('2.9', 'Forms',
       '- Template-driven forms (FormsModule, ngModel)\n- Reactive forms (ReactiveFormsModule, FormGroup, FormBuilder)\n- Validators (built-in + custom)\n- Form submission, status, errors\n- Choosing between template-driven vs reactive',
       NEW, 'Yes', 4,
       'https://angular.dev/guide/forms\nhttps://angular.dev/guide/forms/reactive-forms')

# Section 3 — Angular Advanced
section('3', 'Angular Advanced')
lesson('3.1', 'Signals',
       '- signal(), computed(), effect()\n- Signal-based reactivity vs RxJS Observables\n- Signals in templates\n- toSignal() / toObservable() interop\n- linkedSignal() (Angular 19+)',
       EXP, 'No', '',
       'https://angular.dev/guide/signals\nhttps://angular.dev/guide/signals/inputs')
lesson('3.2', 'Change Detection',
       '- Default vs OnPush strategy\n- markForCheck vs detectChanges\n- Why OnPush + signals = no manual triggers\n- Zone.js role and zoneless mode (experimental)',
       EXP, 'No', '',
       'https://angular.dev/best-practices/runtime-performance\nhttps://angular.dev/guide/zone')
lesson('3.3', 'Content Projection',
       '- <ng-content> for slot-style projection\n- Multi-slot projection with select attribute\n- Conditional projection patterns',
       EXP, 'No', '',
       'https://angular.dev/guide/components/content-projection')
lesson('3.4', 'Custom Directives Deep Dive',
       '- Building a custom structural directive (like *ngIf)\n- Host bindings, host listeners\n- HostDirective composition (Angular 15+)',
       EXP, 'No', '',
       'https://angular.dev/guide/directives/structural-directives\nhttps://angular.dev/guide/directives/directive-composition-api')
lesson('3.5', 'Dynamic Components',
       '- ViewContainerRef.createComponent\n- ngComponentOutlet\n- Use cases: modals, dynamic forms, plugins',
       EXP, 'No', '',
       'https://angular.dev/guide/components/dynamic-component-loading')

# Section 4 — State Management
section('4', 'State Management (NgRx / Signals Store)')
lesson('4.1', 'Getting Started',
       "- What is state management? Why use it?\n- NgRx vs Signals Store vs simple service-with-signal\n- Three core principles (single source of truth, state is read-only, changes via pure functions)",
       NEW, 'Yes', 1,
       'https://ngrx.io/guide/store\nhttps://ngrx.io/guide/signals')
lesson('4.2', 'Actions',
       '- Define actions with createAction / props<>()\n- Action naming conventions\n- Dispatching actions',
       NEW, 'Yes', 2,
       'https://ngrx.io/guide/store/actions')
lesson('4.3', 'Reducers',
       '- createReducer + on()\n- Designing state shape\n- Splitting reducers, combining via store config\n- Immutability rules',
       NEW, 'Yes', 2,
       'https://ngrx.io/guide/store/reducers')
lesson('4.4', 'Selectors',
       '- createSelector / createFeatureSelector\n- Memoization\n- Composing selectors',
       NEW, 'Yes', 2,
       'https://ngrx.io/guide/store/selectors')
lesson('4.5', 'Effects',
       '- Why effects? (async side effects)\n- createEffect, ofType\n- HTTP fetch effects\n- Error handling in effects',
       EXP, 'No', '',
       'https://ngrx.io/guide/effects')
lesson('4.6', 'Signals Store / Component Store',
       '- @ngrx/signals signalStore()\n- withState, withMethods, withComputed, withHooks\n- Comparison with class-based ComponentStore',
       EXP, 'No', '',
       'https://ngrx.io/guide/signals/signal-store\nhttps://ngrx.io/guide/component-store')

# Section 5 — Angular Router
section('5', 'Angular Router')
lesson('5.1', 'Routing Setup',
       "- provideRouter() in standalone bootstrap\n- Routes config array\n- <router-outlet>\n- Default and wildcard routes",
       NEW, 'Yes', 1,
       'https://angular.dev/guide/routing\nhttps://angular.dev/guide/routing/router-tutorial')
lesson('5.2', 'Route Configuration',
       '- path, component, redirectTo, pathMatch\n- Child routes (nested)\n- Named outlets\n- Data property for static route data',
       NEW, 'Yes', 2,
       'https://angular.dev/api/router/Routes')
lesson('5.3', 'Navigation',
       '- routerLink, routerLinkActive\n- Router.navigate / navigateByUrl programmatic\n- Query params, fragments\n- ActivatedRoute snapshot vs Observable / signals',
       NEW, 'Yes', 2,
       'https://angular.dev/guide/routing/common-router-tasks')
lesson('5.4', 'Route Guards',
       '- canActivate, canMatch, canDeactivate, resolve (functional guards preferred)\n- Use cases: auth, dirty form, prefetch',
       NEW, 'Yes', 2,
       'https://angular.dev/guide/routing/route-guards')
lesson('5.5', 'Lazy Loading',
       '- loadChildren with dynamic import()\n- loadComponent for route-level lazy load (standalone)\n- Why lazy loading: bundle size, TTI',
       NEW, 'Yes', 1,
       'https://angular.dev/guide/routing/lazy-loading')
lesson('5.6', 'Router Helpers',
       "- inject(ActivatedRoute) inside guards/components\n- toSignal() on route params\n- routerOutletData\n- Router events stream",
       NEW, 'Yes', 1,
       'https://angular.dev/api/router/ActivatedRoute')

# Section 6 — HTTP & APIs
section('6', 'HTTP & APIs')
lesson('6.1', 'HttpClient',
       '- provideHttpClient(withFetch())\n- Make GET/POST/PUT/DELETE requests\n- Type-safe responses with generics\n- HttpParams, HttpHeaders\n- baseURL convention',
       NEW, 'Yes', 2,
       'https://angular.dev/guide/http\nhttps://angular.dev/guide/http/setup')
lesson('6.2', 'HTTP Interceptors',
       '- Functional interceptors (HttpInterceptorFn)\n- Auth header attachment\n- Request/response transformation\n- Error retry / global error handling\n- Loading indicator pattern',
       NEW, 'Yes', 2,
       'https://angular.dev/guide/http/interceptors')
lesson('6.3', 'Error Handling',
       '- catchError + throwError\n- HttpErrorResponse types\n- User-facing error display\n- Retry with backoff',
       NEW, 'Yes', 1,
       'https://angular.dev/guide/http/making-requests#error-handling')
lesson('6.4', 'RxJS Essentials',
       '- Observables vs Promises\n- Operators: map, switchMap, mergeMap, concatMap, exhaustMap (when each)\n- Subjects: BehaviorSubject, ReplaySubject\n- Subscription management (takeUntilDestroyed)\n- Async pipe',
       NEW, 'Yes', 4,
       'https://rxjs.dev/guide/overview\nhttps://angular.dev/guide/rxjs-interop')

# Section 7 — Useful packages
section('7', 'Useful packages / libraries')
lesson('7.1', '@ngx-translate/core (i18n)',
       '- Why translate runtime? (vs Angular built-in i18n compile-time)\n- Setup TranslateModule\n- Loading translation JSON files\n- translate pipe / TranslateService',
       NEW, 'Yes', 2,
       'https://github.com/ngx-translate/core')
lesson('7.2', 'Angular Material / Tailwind CSS',
       '- Choosing UI lib: Material vs Tailwind vs PrimeNG\n- ng add @angular/material\n- Tailwind via PostCSS setup\n- Theme customization',
       NEW, 'Yes', 2,
       'https://material.angular.io/\nhttps://tailwindcss.com/docs/guides/angular')
lesson('7.3', 'ngx-pagination',
       '- Implement client-side pagination\n- paginate pipe\n- pagination-controls component',
       NEW, 'Yes', 1,
       'https://github.com/michaelbromley/ngx-pagination')
lesson('7.4', 'Sass / SCSS',
       '- Angular CLI built-in SCSS support (--style=scss)\n- Component-scoped styles vs global\n- :host, :host-context\n- ::ng-deep (legacy / use sparingly)',
       NEW, 'Yes', 1,
       'https://angular.dev/guide/components/styling\nhttps://sass-lang.com/')
lesson('7.5', 'ESLint + Prettier',
       '- Replace deprecated TSLint with @angular-eslint\n- Prettier integration\n- pre-commit hooks (husky + lint-staged)',
       EXP, 'No', '',
       'https://github.com/angular-eslint/angular-eslint')
lesson('7.6', 'date-fns / luxon',
       '- Why not Moment.js (deprecated, large)\n- Tree-shakable date manipulation\n- Format / parse / arithmetic',
       EXP, 'No', '',
       'https://date-fns.org/\nhttps://moment.github.io/luxon/')

# Section 8 — Testing
section('8', 'Testing')
lesson('8.1', 'Unit Testing Basics (Karma + Jasmine)',
       '- describe / it / expect\n- beforeEach / afterEach\n- ng test runner\n- Karma vs alternatives (Vitest experimental)',
       NEW, 'Yes', 2,
       'https://angular.dev/guide/testing')
lesson('8.2', 'Component Testing (TestBed)',
       '- TestBed.configureTestingModule\n- ComponentFixture, debugElement, query\n- Testing inputs / outputs / DOM\n- Mocking services',
       NEW, 'Yes', 3,
       'https://angular.dev/guide/testing/components-basics')
lesson('8.3', 'Service Testing',
       '- Pure service unit tests\n- HttpClientTestingModule + HttpTestingController\n- Mocking dependencies via providers',
       NEW, 'Yes', 2,
       'https://angular.dev/guide/testing/services\nhttps://angular.dev/guide/http/testing')
lesson('8.4', 'E2E Testing (Cypress / Playwright)',
       '- Why Cypress/Playwright (Protractor is dead)\n- ng add @cypress/schematic or Playwright setup\n- Page Object Model basics',
       EXP, 'No', '',
       'https://docs.cypress.io/\nhttps://playwright.dev/')

# Section 9 — Deployment
section('9', 'Deployment')
lesson('9.1', 'Environment Configuration',
       '- environments/environment.ts vs environment.production.ts\n- File replacements in angular.json\n- Runtime config (fetch on bootstrap) vs build-time',
       NEW, 'Yes', 1,
       'https://angular.dev/tools/cli/environments')
lesson('9.2', 'Production Build',
       '- ng build --configuration production\n- esbuild builder (default Angular 17+)\n- Bundle analysis (source-map-explorer)\n- Differential loading retired (modern only)',
       NEW, 'Yes', 1,
       'https://angular.dev/tools/cli/build')
lesson('9.3', 'Deploy to Vercel / Netlify / Cloudflare Pages',
       '- ng build then deploy dist/{app}/browser\n- SPA fallback rewrites for client routing\n- Auto-deploy from Git',
       EXP, 'No', '',
       'https://vercel.com/docs/frameworks/angular\nhttps://docs.netlify.com/frameworks/angular/')
lesson('9.4', 'Deploy to AWS S3 + CloudFront',
       '- Use S3 as static website host\n- Sync dist folder via aws s3 sync\n- CloudFront distribution + cache invalidation\n- SPA fallback via custom error response',
       EXP, 'No', '',
       'https://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html')
lesson('9.5', 'SSR / Angular Universal',
       '- Why SSR? (SEO, FCP)\n- ng add @angular/ssr\n- Hydration (Angular 17+)\n- Deploy SSR to Node host (Vercel, Render)',
       EXP, 'No', '',
       'https://angular.dev/guide/ssr\nhttps://angular.dev/guide/hydration')

# ----------------------------------------------------------------------------
# Cover_Page tab
COVER = [['NUS Technology']]
COVER += [[]] * 8  # padding
COVER += [
    ['Angular Training Plan'],
    ['Created by:', 'DuongDN'],
    ['Effective date:', 'May 11, 2026'],
    ['Version:', '1.0'],
]
COVER += [[]] * 13  # padding to row 27
COVER += [['This document contains confidential and proprietary information which may not be disclosed without prior written consent from NUS Technology.']]

# Document_Control tab
DOC_CONTROL = [
    [],
    ['Document Control'],
    ['Version', 'Change description', 'Changed by', 'Date'],
    ['1.0', 'Creation — modeled after NUS_React_Training_Plan_2_5; targets Angular 18+ (standalone components, signals, control flow, esbuild, NgRx Signals, functional guards/interceptors)', 'DuongDN', 'May 11, 2026'],
]

# Reference tab
REFERENCE = [
    ['Holidays List'],
    ['Update calendar mỗi năm'],
    ['', 'Jan 1, 2026', 'Tết Tây'],
    ['', 'Feb 16, 2026', 'Tết âm lịch'],
    ['', 'Feb 17, 2026'],
    ['', 'Feb 18, 2026'],
    ['', 'Feb 19, 2026'],
    ['', 'Feb 20, 2026'],
    ['', 'Apr 26, 2026', 'Giỗ Tổ Hùng Vương (10/3 ÂL)'],
    ['', 'Apr 30, 2026', 'Lễ 30/4'],
    ['', 'May 1, 2026', 'Lễ 1/5'],
    ['', 'Sep 2, 2026', 'Quốc khánh'],
    [],
    ['Lịch học/ lịch thi'],
    ['Update lịch off định kỳ của trainee'],
]


# ----------------------------------------------------------------------------
def main():
    # 1. Create the spreadsheet with 4 sheets matching React structure
    body = {
        'properties': {'title': 'NUS_Angular_Training_Plan_1_0'},
        'sheets': [
            {'properties': {'title': 'Cover_Page', 'index': 0}},
            {'properties': {'title': 'Document_Control', 'index': 1}},
            {'properties': {'title': 'Content', 'index': 2,
                            'gridProperties': {'columnCount': 18, 'rowCount': 100}}},
            {'properties': {'title': 'Reference', 'index': 3}},
        ],
    }
    ss = sheets.create(body=body, fields='spreadsheetId,spreadsheetUrl').execute()
    sid = ss['spreadsheetId']
    url = ss['spreadsheetUrl']
    print(f'Created spreadsheet: {sid}')
    print(f'URL: {url}')

    # 2. Populate each tab
    content_rows = PREAMBLE + CONTENT_ROWS

    sheets.values().batchUpdate(
        spreadsheetId=sid,
        body={
            'valueInputOption': 'USER_ENTERED',
            'data': [
                {'range': "'Cover_Page'!A1", 'values': COVER},
                {'range': "'Document_Control'!A1", 'values': DOC_CONTROL},
                {'range': "'Content'!A1", 'values': content_rows},
                {'range': "'Reference'!A1", 'values': REFERENCE},
            ],
        },
    ).execute()
    print('Populated all 4 tabs.')

    # 3. Light formatting on Content header rows (row 5 = main header)
    requests = []
    # Find Content sheetId
    meta = sheets.get(spreadsheetId=sid).execute()
    content_sheet_id = next(s['properties']['sheetId'] for s in meta['sheets']
                            if s['properties']['title'] == 'Content')
    cover_sheet_id = next(s['properties']['sheetId'] for s in meta['sheets']
                          if s['properties']['title'] == 'Cover_Page')
    doc_sheet_id = next(s['properties']['sheetId'] for s in meta['sheets']
                        if s['properties']['title'] == 'Document_Control')

    # Bold + background on Content header row 5
    requests.append({
        'repeatCell': {
            'range': {'sheetId': content_sheet_id, 'startRowIndex': 4, 'endRowIndex': 5,
                      'startColumnIndex': 0, 'endColumnIndex': 18},
            'cell': {'userEnteredFormat': {
                'backgroundColor': {'red': 0.85, 'green': 0.92, 'blue': 0.83},
                'textFormat': {'bold': True}, 'wrapStrategy': 'WRAP'}},
            'fields': 'userEnteredFormat(backgroundColor,textFormat,wrapStrategy)',
        },
    })
    # Wrap on all content
    requests.append({
        'repeatCell': {
            'range': {'sheetId': content_sheet_id, 'startRowIndex': 0, 'endRowIndex': 100,
                      'startColumnIndex': 0, 'endColumnIndex': 18},
            'cell': {'userEnteredFormat': {'wrapStrategy': 'WRAP', 'verticalAlignment': 'TOP'}},
            'fields': 'userEnteredFormat(wrapStrategy,verticalAlignment)',
        },
    })
    # Column widths (mirror React layout)
    widths = {0: 50, 1: 200, 2: 350, 3: 130, 4: 130, 5: 120, 6: 80,
              7: 110, 8: 80, 9: 100, 10: 100, 11: 350, 12: 110, 13: 200,
              14: 80, 15: 200, 16: 80, 17: 200}
    for col, w in widths.items():
        requests.append({
            'updateDimensionProperties': {
                'range': {'sheetId': content_sheet_id, 'dimension': 'COLUMNS',
                          'startIndex': col, 'endIndex': col + 1},
                'properties': {'pixelSize': w},
                'fields': 'pixelSize',
            },
        })
    # Cover: bold company + title
    requests.append({
        'repeatCell': {
            'range': {'sheetId': cover_sheet_id, 'startRowIndex': 0, 'endRowIndex': 1,
                      'startColumnIndex': 0, 'endColumnIndex': 1},
            'cell': {'userEnteredFormat': {
                'textFormat': {'bold': True, 'fontSize': 14}}},
            'fields': 'userEnteredFormat.textFormat',
        },
    })
    requests.append({
        'repeatCell': {
            'range': {'sheetId': cover_sheet_id, 'startRowIndex': 9, 'endRowIndex': 10,
                      'startColumnIndex': 0, 'endColumnIndex': 1},
            'cell': {'userEnteredFormat': {
                'textFormat': {'bold': True, 'fontSize': 18}}},
            'fields': 'userEnteredFormat.textFormat',
        },
    })
    # Doc Control: header bold
    requests.append({
        'repeatCell': {
            'range': {'sheetId': doc_sheet_id, 'startRowIndex': 1, 'endRowIndex': 3,
                      'startColumnIndex': 0, 'endColumnIndex': 4},
            'cell': {'userEnteredFormat': {
                'textFormat': {'bold': True},
                'backgroundColor': {'red': 0.85, 'green': 0.92, 'blue': 0.83},
                'wrapStrategy': 'WRAP'}},
            'fields': 'userEnteredFormat(backgroundColor,textFormat,wrapStrategy)',
        },
    })

    # Highlight section header rows (those with only A,B filled) in green
    for i, row in enumerate(content_rows):
        if len(row) == 2 and row[0] and not str(row[0]).startswith(('1.', '2.', '3.', '4.', '5.', '6.', '7.', '8.', '9.')) and str(row[0]).isdigit() is False:
            continue
    # Better approach: scan CONTENT_ROWS by index. Section rows = those with 2 cells and integer-only no
    section_rows = []
    for i, row in enumerate(content_rows):
        if len(row) == 2 and row[0] and isinstance(row[0], str) and row[0].isdigit():
            section_rows.append(i)
    for r in section_rows:
        requests.append({
            'repeatCell': {
                'range': {'sheetId': content_sheet_id, 'startRowIndex': r, 'endRowIndex': r + 1,
                          'startColumnIndex': 0, 'endColumnIndex': 18},
                'cell': {'userEnteredFormat': {
                    'backgroundColor': {'red': 1.0, 'green': 0.95, 'blue': 0.7},
                    'textFormat': {'bold': True}}},
                'fields': 'userEnteredFormat(backgroundColor,textFormat)',
            },
        })

    sheets.batchUpdate(spreadsheetId=sid, body={'requests': requests}).execute()
    print('Applied formatting.')

    # 4. Share with the user (writer access)
    drive.permissions().create(
        fileId=sid,
        body={'type': 'user', 'role': 'writer', 'emailAddress': SHARE_WITH},
        sendNotificationEmail=False,
    ).execute()
    print(f'Shared writer access with {SHARE_WITH}.')

    # 5. Make link-viewable (anyone with link, reader) so it shows in Drive UI consistently
    # Skipping anyone-link to keep it private. User has writer access via direct invite.

    print(f'\nDONE. Spreadsheet URL:\n{url}')
    return url


if __name__ == '__main__':
    main()
