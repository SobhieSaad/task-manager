import { type RouteConfig, index, layout } from "@react-router/dev/routes";

export default [
    //index("routes/root/HomePage.tsx")

    layout(
        'routes/auth/auth-layout.tsx', [
            index('routes/auth/sign-in.tsx'),
            index('routes/auth/sign-up.tsx'),
            index('routes/auth/foreget-password.tsx'),
            index('routes/auth/reset-password.tsx'),
            index('routes/auth/verify-email.tsx'),
        ]
    )
] satisfies RouteConfig;
