import { beforeEach, describe, expect, it, vi } from "vitest";
import { AddFamiliesData } from "@/services/family/add/surveyor";
import { Family, Foodstuff } from "@/types/family";

global.alert = vi.fn();

describe("Unit Test: Logic AddFoodToList", () => {
  beforeEach(() => vi.clearAllMocks());

  const mockSetForm = vi.fn();
  const mockSetFoodsList = vi.fn();
  const initialForm: Pick<Family, "foodstuff" | "id_foods" | "portion"> = { foodstuff: [], id_foods: "", portion: 0 };

  // SKENARIO POSITIF: Berhasil Menambahkan Makanan
  it("harus berhasil menambahkan makanan baru ke dalam list", () => {
    const currentList: Foodstuff[] = [];
    const formState = { ...initialForm, id_foods: "Nasi Goreng", portion: 2 };

    AddFamiliesData.addFoodToList(currentList, formState, mockSetForm, mockSetFoodsList);

    expect(global.alert).not.toHaveBeenCalled();
    expect(mockSetFoodsList).toHaveBeenCalledWith([expect.objectContaining({ name: "Nasi Goreng", portion: 2 })]);
    expect(mockSetForm).toHaveBeenCalledWith(expect.objectContaining({ id_foods: "", portion: undefined }));
  });

  it("harus menolak (alert) jika nama makanan atau porsi kosong", () => {
    const currentList: Foodstuff[] = [];
    const formState = { ...initialForm, id_foods: "", portion: 2 };

    AddFamiliesData.addFoodToList(currentList, formState, mockSetForm, mockSetFoodsList);

    expect(global.alert).toHaveBeenCalledWith("Nama olahan pangan dan porsi wajib diisi!");
    expect(mockSetFoodsList).not.toHaveBeenCalled();
  });

  it("harus menolak (alert) jika makanan sudah ada di list", () => {
    const currentList: Foodstuff[] = [{ id: 1, name: "Sate Ayam", portion: 5 }];
    const formState = { ...initialForm, id_foods: "sate ayam", portion: 3 };

    AddFamiliesData.addFoodToList(currentList, formState, mockSetForm, mockSetFoodsList);

    expect(global.alert).toHaveBeenCalledWith("Olahan pangan tersebut sudah ditambahkan!");
    expect(mockSetFoodsList).not.toHaveBeenCalled();
  });
});