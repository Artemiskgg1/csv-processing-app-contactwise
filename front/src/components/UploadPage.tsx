"use client";

import { useState } from "react";
import axios from "axios";
import Papa from "papaparse";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFile = event.target.files[0];

      // Check if file is a CSV
      if (!selectedFile.name.endsWith(".csv")) {
        toast.error("Invalid file type. Please upload a CSV file.");
        setFile(null);
        return;
      }

      setFile(selectedFile);
    }
  };

  const validateCSV = (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      Papa.parse(file, {
        complete: (result: { data: any }) => {
          const { data } = result;
          if (!data || data.length === 0) {
            toast.error("The CSV file is empty.");
            resolve(false);
            return;
          }

          const headers = data[0].map((header: string) => header.toLowerCase());

          // Required headers
          const requiredHeaders = ["name", "email"];

          // Check if only required headers are present
          if (
            headers.length !== requiredHeaders.length ||
            !headers.every((h: string) => requiredHeaders.includes(h))
          ) {
            toast.error(
              "Invalid CSV format. Only 'name' and 'email' are allowed."
            );
            resolve(false);
            return;
          }

          resolve(true);
        },
        error: () => {
          toast.error("Error reading CSV file.");
          resolve(false);
        },
      });
    });
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file before uploading.");
      return;
    }

    // Validate CSV file structure
    const isValid = await validateCSV(file);
    if (!isValid) {
      return;
    }

    setStatus("processing");
    const toastId = toast.loading("Uploading file...");

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(`${API_BASE_URL}/api/csv/upload`, formData);

      toast.dismiss(toastId);
      setStatus("processed");
      toast.success("File uploaded successfully!");
    } catch (error) {
      toast.dismiss(toastId);
      setStatus("failed");
      toast.error("Upload failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center m-2 text-white">
      <Card className="w-96 bg-zinc-200 shadow-lg">
        <CardHeader>
          <CardTitle>Upload Your CSV File</CardTitle>
        </CardHeader>
        <CardContent>
          <Label htmlFor="file-upload" className="text-sm font-medium">
            Select File
          </Label>
          <Input
            id="file-upload"
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="mb-4"
          />
          <Button onClick={handleUpload} className="w-full">
            Upload
          </Button>
          {status === "processing" && (
            <Alert className="mt-4 border-blue-500 bg-blue-950 text-blue-300">
              <AlertTitle>Processing</AlertTitle>
              <AlertDescription>
                Uploading file, please wait...
              </AlertDescription>
            </Alert>
          )}
          {status === "processed" && (
            <Alert className="mt-4 border-green-500 bg-green-950 text-green-300">
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>File uploaded successfully!</AlertDescription>
            </Alert>
          )}
          {status === "failed" && (
            <Alert className="mt-4 border-red-500 bg-red-950 text-red-300">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                File upload failed. Try again.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
