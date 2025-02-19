import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

const PRIVATE_ROUTES = ["/", "/log-workout", "progress", "goals", "community"];

export const updateSession = async (request: NextRequest) => {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const user = await supabase.auth.getUser();

  if (PRIVATE_ROUTES.includes(request.nextUrl.pathname) && user.error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (!PRIVATE_ROUTES.includes(request.nextUrl.pathname) && !user.error) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return response;
};
