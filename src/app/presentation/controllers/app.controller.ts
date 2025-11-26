import { Controller, Get } from "@nestjs/common";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";

import { HealthOutputDto } from "@/app/presentation/dto/outputs/health.output-dto";

@Controller()
export class AppController {
	@Get("/health-check")
	@ApiOperation({
		description: "Get the health of the application",
		summary: "Health",
	})
	@ApiOkResponse({ type: HealthOutputDto })
	public health(): HealthOutputDto {
		return { status: "ok" };
	}
}
