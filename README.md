This repository should describe the problem of using a pipe in a nest js gateway.

When you use the pipe with <pre> @UsePipe(...) </pre> the pipe gets called but the handle function <strong>not</strong> (if you remove the decorator the handle function gets called).

You need to use the <pre>@MessageBody(...)</pre> decorator for the pipe.

Code can be found under src/gateways/chat/chat.gateway.ts ( important lines are  )