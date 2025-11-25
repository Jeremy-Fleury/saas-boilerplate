import { DateLuxonService } from "@/shared/clock/infrastructure/services/date.luxon-service";
import { IdUuidService } from "@/shared/id/infrastructure/services/id.uuid-service";

import { CreateExampleUseCase } from "./create-example.use-case";

it("should create an example", () => {
	const useCase = new CreateExampleUseCase(new DateLuxonService(), new IdUuidService());
	const example = useCase.execute({ description: "Test", name: "Test" });
	expect(example).toBeDefined();
});
