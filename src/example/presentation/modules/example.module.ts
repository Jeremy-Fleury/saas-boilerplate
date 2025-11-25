import { Module } from "@nestjs/common";

import { CreateExampleUseCase } from "@/example/application/create-example-use-cases/create-example.use-case";

@Module({
	controllers: [],
	imports: [],
	providers: [CreateExampleUseCase],
})
export class ExampleModule {}
