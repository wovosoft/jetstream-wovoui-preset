<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CanAnyMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param Request $request
     * @param \Closure(Request): (Response) $next
     * @param mixed ...$abilities
     * @return Response
     */
    public function handle(Request $request, Closure $next, ...$abilities): Response
    {
        if (\Gate::none($abilities)) {
            abort(404);
        }
        return $next($request);
    }
}
