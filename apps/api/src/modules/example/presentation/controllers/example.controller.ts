import { Body, Controller, Get, HttpCode, HttpStatus, Inject, NotFoundException, Param, Post } from "@nestjs/common";
import {
	ApiBadRequestResponse,
	ApiBody,
	ApiCreatedResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiParam,
} from "@nestjs/swagger";

import {
	EXAMPLE_CREATE_EXAMPLE_USE_CASE_TOKEN,
	EXAMPLE_GET_EXAMPLE_USE_CASE_TOKEN,
} from "@/modules/example/infrastructure/dependency-injection/example.token";
import { ExampleInputDto } from "@/modules/example/presentation/dto/inputs/example.input-dto";
import { ExampleOutputDto } from "@/modules/example/presentation/dto/outputs/example.output-dto";
import { ExampleOutputDtoMappers } from "@/modules/example/presentation/mappers/example-output-dto.mappers";
import type { CreateExampleUseCase } from "@/modules/example/application/create-example.use-case";
import type { GetExampleUseCase } from "@/modules/example/application/get-example.use-case";

@Controller("example")
export class ExampleController {
	public constructor(
		@Inject(EXAMPLE_CREATE_EXAMPLE_USE_CASE_TOKEN)
		private readonly _createExampleUseCase: CreateExampleUseCase,
		@Inject(EXAMPLE_GET_EXAMPLE_USE_CASE_TOKEN)
		private readonly _getExampleUseCase: GetExampleUseCase,
	) {}

	@Get(":id")
	@HttpCode(HttpStatus.OK)
	@ApiOperation({
		description: `
Retrieves an **Example** by its identifier.

### Purpose
- Allow a client (UI, service, script) to fetch the current state of an **Example** resource.
- Typical read endpoint: idempotent and safe.
`.trim(),
		summary: "Get Example",
	})
	@ApiOkResponse({
		description: "Example found and returned.",
		type: ExampleOutputDto,
	})
	@ApiNotFoundResponse({
		description: "Example not found for the provided identifier.",
	})
	@ApiParam({
		description: "Unique identifier of the Example.",
		example: "019ad951-368a-7de5-b7ba-add19cfd187b",
		name: "id",
		required: true,
		type: String,
	})
	public async getExampleById(@Param("id") id: string): Promise<ExampleOutputDto> {
		const example = await this._getExampleUseCase.execute(id);

		if (!example) {
			throw new NotFoundException("Example not found");
		}

		return ExampleOutputDtoMappers.fromEntity(example);
	}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	@ApiOperation({
		description: `
Creates a new **Example** from the provided payload.

### Purpose
- Create an **Example** resource and return its canonical representation.
- Typical create endpoint: non-idempotent.
`.trim(),
		summary: "Create Example",
	})
	@ApiCreatedResponse({
		description: "Example successfully created.",
		type: ExampleOutputDto,
	})
	@ApiBadRequestResponse({
		description: "Invalid payload (DTO validation / constraints).",
	})
	@ApiBody({
		description: "Example creation payload.",
		type: ExampleInputDto,
	})
	public async createExample(@Body() body: ExampleInputDto): Promise<ExampleOutputDto> {
		const example = await this._createExampleUseCase.execute(body);
		return ExampleOutputDtoMappers.fromEntity(example);
	}
}
