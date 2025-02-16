"use client";

import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import Navbar from "@/components/Navbar";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:7000/api/csv/upload",
        formData
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Upload failed");
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      {/* Navbar */}
      {/* <Navbar /> */}

      {/* Upload Section */}
      <Card className="mt-10 w-96">
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
          {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}
        </CardContent>
      </Card>
    </div>
  );
}
