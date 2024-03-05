import axios, { AxiosResponse } from "axios";

const API_URL = "http://localhost:8080/api/";

export interface CellData {
  id: string;
  name: string;
  type: string;
  location: string;
}

const AddNewCell = (
  name: string,
  type: string,
  location: string,
  headers: Record<string, string>
): Promise<AxiosResponse<CellData>> => {
  return axios
    .post<CellData>(
      API_URL + "cells/create",
      {
        name,
        type,
        location,
      },
      { headers: headers }
    )
    .then((response: AxiosResponse<CellData>) => {
      return response;
    })
    .catch((error) => {
      throw new Error("Failed to add new cell: " + error.message);
    });
};


const getCellsByUserId = (userId: string) => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    throw new Error("Access token not found");
  }

  const headers = {
    "x-access-token": accessToken, // Custom header
  };

  return axios
    .get<CellData[]>(API_URL + `cells/${userId}`, { headers })
    .then((response: AxiosResponse<CellData[]>) => {
      return response.data;
    })
    .catch((error) => {
      throw new Error("Failed to get cells by user ID: " + error.message);
    });
};

const CellService = { AddNewCell, getCellsByUserId};

export default CellService;
