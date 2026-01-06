import { Body, Controller, HttpCode, HttpStatus, Inject, Post } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

import type { CreateCompanyUseCase } from "../../application/create-company-use-cases/create-company.use-case";
import { COMPANY_CREATE_COMPANY_USE_CASE_TOKEN } from "../../infrastructure/dependency-injection/company.token";
import { CompanyInputDto } from "../dto/inputs/company.input-dto";
import { CompanyOutputDto } from "../dto/outputs/company.output-dto";
import { CompanyOutputDtoMappers } from "../mappers/company-output-dto.mappers";

@ApiTags("company")
@Controller("company")
export class CompanyController {
	public constructor(
		@Inject(COMPANY_CREATE_COMPANY_USE_CASE_TOKEN)
		private readonly _createCompanyUseCase: CreateCompanyUseCase,
	) {}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	@ApiOperation({
		description: `
Creates a new **Company** from the provided payload.

### Purpose
- Create a **Company** resource and return its canonical representation.
- Typical create endpoint: non-idempotent.
`.trim(),
		summary: "Create Company",
	})
	@ApiCreatedResponse({
		description: "Company successfully created.",
		type: CompanyOutputDto,
	})
	@ApiBadRequestResponse({
		description: "Invalid payload (DTO validation / constraints).",
	})
	@ApiBody({
		description: "Company creation payload.",
		type: CompanyInputDto,
	})
	public async createCompany(@Body() body: CompanyInputDto): Promise<CompanyOutputDto> {
		const company = await this._createCompanyUseCase.execute(body);

		return CompanyOutputDtoMappers.fromEntity(company);
	}
}
