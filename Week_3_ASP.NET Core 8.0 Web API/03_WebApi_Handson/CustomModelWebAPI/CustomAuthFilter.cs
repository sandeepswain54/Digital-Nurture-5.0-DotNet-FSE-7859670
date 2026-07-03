using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace CustomModelWebAPI.Filters
{
    public class CustomAuthFilter : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            // Check if Authorization header exists
            if (!context.HttpContext.Request.Headers.ContainsKey("Authorization"))
            {
                context.Result = new BadRequestObjectResult(
                    "Invalid request - No Auth token"
                );
                return;
            }

            // Check if Authorization header contains Bearer
            var authHeader = context.HttpContext.Request.Headers["Authorization"].ToString();
            if (!authHeader.Contains("Bearer"))
            {
                context.Result = new BadRequestObjectResult(
                    "Invalid request - Token present but Bearer unavailable"
                );
                return;
            }

            base.OnActionExecuting(context);
        }
    }
}