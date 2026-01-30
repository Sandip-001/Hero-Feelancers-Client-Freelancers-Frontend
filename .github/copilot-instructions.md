# HeroFreelancer Frontend - AI Coding Guidelines

## Architecture Overview
This is a Next.js 14 freelance platform with role-based dashboards:
- **Freelancers**: `(dashboard)` route group - project management, proposals, messaging
- **Clients**: `(client-dashboard)` route group - job posting, project oversight, payments
- **Public**: Landing page, login/signup, job browsing

## Key Patterns & Conventions

### Route Groups & Guards
- Use `(dashboard)` for freelancer routes, `(client-dashboard)` for client routes
- Each group has a layout with role-based guard component
- Guards use `useGetMeQuery()` to verify authentication and role
- Unauthenticated users redirect to `/login`

```typescript
// app/(dashboard)/freelacnerGuard.tsx
const { data, isLoading } = useGetMeQuery();
if (!data || data.role !== "freelancer") router.replace("/login");
```

### API Integration (RTK Query)
- All APIs extend `baseApi` with cookie credentials enabled
- Endpoints follow `/api/{role}/{action}` pattern
- Use tag invalidation for auth-related mutations
- Separate API slices: `auth.api.ts`, `clientAuth.api.ts`, `freelancerAuth.api.ts`

```typescript
// app/redux/api/baseApi.ts
baseQuery: fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  credentials: "include", // Required for auth cookies
})
```

### Authentication Flow
- **Registration**: Clients use JSON payload, freelancers use FormData (includes resume file)
- **OTP Verification**: Required after registration for both roles
- **Login**: Returns user data and profile completion percentage
- **Role Detection**: `useGetMeQuery()` returns `{user, role: "client"|"freelancer"}`

### State Management
- Redux Toolkit store with RTK Query middleware
- No additional reducers - API state only
- Provider wraps entire app in `app/layout.tsx`

### Styling & UI
- **Tailwind CSS** with Shadcn UI components
- Custom CSS variables in `app/globals.css` for theming
- `cn()` utility from `lib/utils.ts` for conditional classes
- Dark mode support via `next-themes`

### File Structure Examples
```
app/
├── (dashboard)/           # Freelancer routes
│   ├── profile/page.tsx   # /dashboard/profile
│   └── freelacnerGuard.tsx
├── (client-dashboard)/    # Client routes  
│   ├── jobpost/page.tsx   # /client-dashboard/jobpost
│   └── clientGuard.tsx
├── redux/api/             # RTK Query slices
│   ├── baseApi.ts         # Base configuration
│   └── clientAuth.api.ts  # Client auth endpoints
└── types/auth.ts          # TypeScript interfaces
```

### Development Workflow
- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run lint` - ESLint checking
- Environment: `NEXT_PUBLIC_API_URL` for backend API

### Common Patterns
- **Loading States**: Check `isLoading` from RTK Query hooks
- **Error Handling**: RTK Query provides error states automatically
- **Navigation**: Use `next/navigation` for programmatic routing
- **Forms**: Handle both JSON and FormData based on endpoint requirements

### Adding New Features
1. **API Endpoints**: Create in appropriate API slice, inject into baseApi
2. **Routes**: Add to correct route group with proper guard
3. **Types**: Define interfaces in `types/` directory
4. **Components**: Use Shadcn UI from `components/ui/`, custom in `components/`

Reference: `README.md`, `PROJECT_SUMMARY.md` for complete feature overview</content>
<parameter name="filePath">d:\HeroFreelancer_API_Integration\HeroFreelancer-Frontend\.github\copilot-instructions.md