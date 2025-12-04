import type { Company } from "../../domain/entities/company.entity";
import { CompanyOutputDto } from "../dto/outputs/company.output-dto";

export class CompanyOutputDtoMappers {
	public static fromEntity(entity: Company): CompanyOutputDto {
		const dto = new CompanyOutputDto();

		dto.id = entity.id.value;
		dto.name = entity.name.value;

		return dto;
	}
}
