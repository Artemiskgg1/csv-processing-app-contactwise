"use client";

import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file before uploading.");
      return;
    }

    setStatus("processing");
    const toastId = toast.loading("Uploading file..."); // Store toast ID

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "https://csv-processing-app-contactwise.onrender.com/api/csv/upload",
        formData
      );

      toast.dismiss(toastId); // Dismiss loading toast
      setStatus("processed");
      toast.success("File uploaded successfully!");
    } catch (error) {
      toast.dismiss(toastId); // Dismiss loading toast on error
      setStatus("failed");
      toast.error("Upload failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-zinc-900 text-white">
      {/* <h1 className="text-3xl font-bold mb-6">CSV File Upload</h1> */}
      <Card className="w-96 bg-zinc-200  shadow-lg">
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
