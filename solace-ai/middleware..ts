// middleware.ts
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  // only run the middleware on /app/* and on your API endpoints
  matcher: [
    "/app/:path*", 
    "/api/:path*",
  ],
};
