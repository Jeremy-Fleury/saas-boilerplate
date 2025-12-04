import { Module } from "@nestjs/common";

import { DatabaseModule } from "@/common/database/infrastructure/modules/database.module";
import { UuidModule } from "@/common/uuid/infrastructure/modules/uuid.module";

import { CompanyController } from "../../presentation/controllers/company.controller";
import { COMPANY_CREATE_COMPANY_USE_CASE_PROVIDER } from "../dependency-injection/company.provider";

@Module({
	controllers: [CompanyController],
	exports: [],
	imports: [UuidModule, DatabaseModule],
	providers: [COMPANY_CREATE_COMPANY_USE_CASE_PROVIDER],
})
export class CompanyModule {}
