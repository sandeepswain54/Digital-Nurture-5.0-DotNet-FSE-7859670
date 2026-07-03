using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace CustomModelWebAPI.Filters
{
    public class CustomExceptionFilter : IExceptionFilter
    {
        public void OnException(ExceptionContext context)
        {
            // Get exception details
            var exception = context.Exception;
            var errorMessage = exception.Message;
            var stackTrace = exception.StackTrace;

            // Write exception to a log file
            var logPath = Path.Combine(Directory.GetCurrentDirectory(), "error_log.txt");
            var logContent = $"[{DateTime.Now}] ERROR: {errorMessage}\nStackTrace: {stackTrace}\n\n";
            File.AppendAllText(logPath, logContent);

            // Set result to return 500 Internal Server Error
            context.Result = new ObjectResult(new
            {
                StatusCode = 500,
                Message = "Internal Server Error: " + errorMessage
            })
            {
                StatusCode = 500
            };

            context.ExceptionHandled = true;
        }
    }
}