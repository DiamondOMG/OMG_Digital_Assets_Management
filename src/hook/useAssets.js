"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const ASSET_URL = "http://127.0.0.1:8000/asset";

// ฟังก์ชันดึงข้อมูล (GET)
export const useAssets = () => {
  return useQuery({
    queryKey: ["assets"],
    queryFn: async () => {
      const { data } = await axios.get(ASSET_URL);
      return data; // คืนค่าข้อมูลที่ได้จาก API
    },
  });
};

// ฟังก์ชันสร้างข้อมูลใหม่ (POST)
export const useCreateAsset = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (newAsset) => {
      const { data } = await axios.post(ASSET_URL, newAsset);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["assets"]);
      },
    }
  );
};

// ฟังก์ชันอัปเดตข้อมูล (PUT)
export const useUpdateAsset = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ id, updatedAsset }) => {
      const { data } = await axios.put(`${ASSET_URL}/${id}`, updatedAsset);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["assets"]);
      },
    }
  );
};

// ฟังก์ชันลบข้อมูล (DELETE)
export const useDeleteAsset = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (id) => {
      await axios.delete(`${ASSET_URL}/${id}`);
      return id; // คืนค่า id ที่ลบไป
    },
    {
      onSuccess: (id) => {
        // รีเฟรชข้อมูล assets หลังจากลบ
        queryClient.invalidateQueries(["assets"]);
      },
    }
  );
};
