import { Body, Controller, Get, HttpCode, HttpStatus, Inject, NotFoundException, Param, Post } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam } from "@nestjs/swagger";

import type { CreateExampleUseCase } from "../../application/create-example-use-cases/create-example.use-case";
import type { GetExampleUseCase } from "../../application/get-example-use-cases/get-example.use-case";
import { EXAMPLE_CREATE_EXAMPLE_USE_CASE_TOKEN, EXAMPLE_GET_EXAMPLE_USE_CASE_TOKEN } from "../../infrastructure/dependency-injection/example.token";
import { ExampleInputDto } from "../dto/inputs/example.input-dto";
import { ExampleOutputDto } from "../dto/outputs/example.output-dto";

@Controller("examples")
export class ExampleController {
	public constructor(
		@Inject(EXAMPLE_CREATE_EXAMPLE_USE_CASE_TOKEN)
		private readonly _createExampleUseCase: CreateExampleUseCase,
		@Inject(EXAMPLE_GET_EXAMPLE_USE_CASE_TOKEN)
		private readonly _getExampleUseCase: GetExampleUseCase,
	) {}

	@Get(":id")
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ description: "Get an example by id", summary: "Get Example" })
	@ApiOkResponse({
		type: ExampleOutputDto,
	})
	@ApiNotFoundResponse({
		description: "Example not found",
	})
	@ApiParam({
		description: "The id of the example",
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

		return ExampleOutputDto.fromEntity(example);
	}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	@ApiOperation({
		description: "Create a new example",
		summary: "Create Example",
	})
	@ApiCreatedResponse({
		description: "Example successfully created",
		type: ExampleOutputDto,
	})
	@ApiBadRequestResponse({
		description: "Validation failed for the payload",
	})
	@ApiBody({
		description: "The example to create",
		type: ExampleInputDto,
	})
	public async createExample(@Body() body: ExampleInputDto): Promise<ExampleOutputDto> {
		const example = await this._createExampleUseCase.execute(body);
		return ExampleOutputDto.fromEntity(example);
	}
}
