import api from "@/api/api";
import { Store } from "@/models/store.model";

export const getStores = async () => {
    return api.get<Store[]>("/stores");
}