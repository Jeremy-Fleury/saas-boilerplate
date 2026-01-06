import { Controller, Get } from "@nestjs/common";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";

import { HealthOutputDto } from "@/app/presentation/dto/outputs/health.output-dto";

@Controller()
export class AppController {
	@Get("/health-check")
	@ApiOperation({
		description: `
Checks that the API is **alive** and able to respond to an HTTP request.

### Purpose
- Used by a **load balancer**, **Kubernetes** (livenessProbe), or a monitoring system.
- This endpoint responds **quickly** and **without required dependencies** (no DB, no external APIs).

### What this endpoint guarantees
- The NestJS process is running
- The HTTP stack (Fastify) responds correctly
- Routing is working

### What this endpoint does *not* guarantee
- Database availability
- Network connectivity to external services
- Business-level health (e.g., ability to process a transaction)
`.trim(),
		summary: "Health check",
	})
	@ApiOkResponse({
		description: 'Liveness response: `status="ok"`.',
		type: HealthOutputDto,
	})
	public health(): HealthOutputDto {
		return { status: "ok" };
	}
}
