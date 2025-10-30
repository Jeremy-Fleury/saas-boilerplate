import { HttpException, HttpStatus } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { vi } from "vitest";
import type { TestingModule } from "@nestjs/testing";

import { CreateExampleUseCase } from "@/example/application/use-cases/create-example.use-case";
import { GetExampleUseCase } from "@/example/application/use-cases/get-example.use-case";
import type { IExampleAggregate } from "@/example/domain/aggregates/example.aggregate";
import type { ExampleInputDto } from "@/example/presentation/dto/inputs/example.input-dto";

import { ExampleController } from "./example.controller";

describe("ExampleController", () => {
	let controller: ExampleController;
	let createUseCase: { execute: ReturnType<typeof vi.fn> };
	let getUseCase: { execute: ReturnType<typeof vi.fn> };

	beforeEach(async () => {
		createUseCase = { execute: vi.fn() };
		getUseCase = { execute: vi.fn() };

		const module: TestingModule = await Test.createTestingModule({
			controllers: [ExampleController],
			providers: [
				{ provide: CreateExampleUseCase, useValue: createUseCase },
				{ provide: GetExampleUseCase, useValue: getUseCase },
			],
		}).compile();

		controller = module.get<ExampleController>(ExampleController);
	});

	describe("get", () => {
		it("should return example for provided id", () => {
			const example: IExampleAggregate = { description: "Desc", id: "123", name: "Example" };
			getUseCase.execute.mockReturnValue(example);

			const result = controller.get("123");

			expect(getUseCase.execute).toHaveBeenCalledWith("123");
			expect(result).toEqual(example);
		});

		it("should throw HttpException when example not found", () => {
			getUseCase.execute.mockImplementation(() => {
				throw new HttpException("Example not found", HttpStatus.NOT_FOUND);
			});

			expect(() => controller.get("missing")).toThrow(HttpException);
		});
	});

	describe("create", () => {
		it("should create and return example", () => {
			const input: ExampleInputDto = { description: "Desc", name: "Example" } as ExampleInputDto;
			const created: IExampleAggregate = { description: "Desc", id: "id-1", name: "Example" };
			createUseCase.execute.mockReturnValue(created);

			const result = controller.create(input);

			expect(createUseCase.execute).toHaveBeenCalledWith(input);
			expect(result).toEqual(created);
		});
	});
});
