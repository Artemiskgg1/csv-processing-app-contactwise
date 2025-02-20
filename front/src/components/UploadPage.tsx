"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Papa from "papaparse";
import io from "socket.io-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || API_BASE_URL;

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [jobData, setJobData] = useState<
    { id: string; name: string; email: string }[]
  >([]);

  useEffect(() => {
    const socket = io(SOCKET_URL);

    socket.on("connect", () => {
      console.log("Connected to server for live updates.");
    });

    socket.on("jobProcessing", (data) => {
      console.log("Processing job:", data);
      setStatus("uploading");
      setProgress(50);
      setJobData((prev) => [
        ...prev,
        { id: data.id, name: data.data.name, email: data.data.email },
      ]);
    });

    socket.on("jobQueued", () => {
      console.log("Job queued.");
      setStatus("queued");
      toast.info("File upload is queued.");
    });

    socket.on("jobCompleted", () => {
      console.log("Job completed event received!");
      setStatus("completed");
      setProgress(null);
      toast.success("File uploaded successfully!");
    });

    socket.on("jobFailed", () => {
      console.log("Job failed event received!");
      setStatus("failed");
      setProgress(null);
      toast.error("File upload failed. Try again.");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server.");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  console.log(status, progress);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFile = event.target.files[0];

      if (!selectedFile.name.endsWith(".csv")) {
        toast.error("Invalid file type. Please upload a CSV file.");
        setFile(null);
        return;
      }

      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file before uploading.");
      return;
    }

    setStatus("processing");
    setProgress(0);
    const toastId = toast.loading("Uploading file...");

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(`${API_BASE_URL}/api/csv/upload`, formData);

      toast.dismiss(toastId);
      setStatus("queued");
      toast.success("File uploaded successfully! Job is queued.");
    } catch (error) {
      toast.dismiss(toastId);
      setStatus("failed");
      toast.error("Upload failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-zinc-900 text-white min-h-screen">
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
          {status === "uploading" && progress !== null && (
            <Alert className="mt-4 border-blue-500 bg-blue-950 text-blue-300">
              <AlertTitle>Uploading...</AlertTitle>
              <AlertDescription>
                Uploading file... {progress}% completed.
              </AlertDescription>
            </Alert>
          )}
          {status === "completed" && (
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

      {jobData.length > 0 && (
        <div className="mt-6 w-full max-w-2xl">
          <h2 className="text-xl font-semibold text-center mb-4">
            Live Processed Jobs
          </h2>
          <Table className="border border-gray-700">
            <TableHeader>
              <TableRow>
                <TableHead className="border border-gray-700 text-center">
                  ID
                </TableHead>
                <TableHead className="border border-gray-700 text-center">
                  Name
                </TableHead>
                <TableHead className="border border-gray-700 text-center">
                  Email
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobData.map((job) => (
                <TableRow key={job.id} className="border border-gray-700">
                  <TableCell className="border border-gray-700 text-center">
                    {job.id}
                  </TableCell>
                  <TableCell className="border border-gray-700 text-center">
                    {job.name}
                  </TableCell>
                  <TableCell className="border border-gray-700 text-center">
                    {job.email}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
