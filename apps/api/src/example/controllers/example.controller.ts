import { Body, Controller, Get, Inject, Param, Post } from "@nestjs/common";
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam } from "@nestjs/swagger";

import { ExampleInputDto } from "@/example/dtos/inputs/example.input-dto";
import { ExampleOutputDto } from "@/example/dtos/outputs/example.output-dto";
import { CreateExampleUseCase } from "@/example/use-cases/create-example.use-case";
import { GetExampleUseCase } from "@/example/use-cases/get-example.use-case";

@Controller("example")
export class ExampleController {
	public constructor(
		@Inject(CreateExampleUseCase)
		private readonly _createExampleUseCase: CreateExampleUseCase,
		@Inject(GetExampleUseCase)
		private readonly _getExampleUseCase: GetExampleUseCase,
	) {}

	@Get(":id")
	@ApiOperation({
		description: "Get an example by id",
		summary: "Get example",
	})
	@ApiParam({ name: "id", type: String })
	@ApiOkResponse({ type: ExampleOutputDto })
	public get(@Param("id") id: string): ExampleOutputDto | null {
		return this._getExampleUseCase.execute(id);
	}

	@Post()
	@ApiOperation({
		description: "Create a new example",
		summary: "Create example",
	})
	@ApiBody({ type: ExampleInputDto })
	@ApiCreatedResponse({
		description: "The record has been successfully created.",
		type: ExampleOutputDto,
	})
	public create(@Body() body: ExampleInputDto): ExampleOutputDto {
		return this._createExampleUseCase.execute(body);
	}

	@Post("/vop")
	@ApiOperation({
		description: "Validate a new example",
		summary: "Validate example",
	})
	@ApiBody({ type: ExampleInputDto })
	@ApiCreatedResponse({
		description: "The record has been successfully validated.",
		type: ExampleOutputDto,
	})
	public vop(@Body() body: ExampleInputDto): ExampleOutputDto {
		return this._createExampleUseCase.execute(body);
	}
}
