"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Upload } from "lucide-react";
import { toast } from "sonner";
import { useUpdateClientMutation } from "@/app/redux/api/clientAuth.api";
import Image from "next/image";

interface Props {
  open: boolean;
  onClose: () => void;
  client: any;
}

export default function EditClientProfileModal({
  open,
  onClose,
  client,
}: Props) {
  const [updateProfile, { isLoading }] = useUpdateClientMutation();

  const [formData, setFormData] = useState({
    documentType: "",
    documentNumber: "",
    companyName: "",
    companyAbout: "",
    companyWebsite: "",
    linkedinUrl: "",
    twitterUrl: "",
    facebookUrl: "",
  });

  const [documentFront, setDocumentFront] = useState<File | null>(null);
  const [documentBack, setDocumentBack] = useState<File | null>(null);
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const isIndia = client?.countryName === "India";

  const documentOptions = isIndia
    ? ["AADHAR", "PAN"]
    : ["PASSPORT", "NATIONAL_ID"];

  useEffect(() => {
    if (open && client) {
      setFormData({
        documentType: client?.documentType || "",
        documentNumber: client?.documentNumber || "",
        companyName: client?.companyName || "",
        companyAbout: client?.companyAbout || "",
        companyWebsite: client?.companyWebsite || "",
        linkedinUrl: client?.linkedinUrl || "",
        twitterUrl: client?.twitterUrl || "",
        facebookUrl: client?.facebookUrl || "",
      });

      // 🔥 Reset file states also
      setDocumentFront(null);
      setDocumentBack(null);
      setProfileImage(null);
    }
  }, [open, client]);


  const handleSubmit = async () => {
    try {
      const data = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (value) data.append(key, value as string);
      });

      if (documentFront) data.append("documentFront", documentFront);
      if (documentBack) data.append("documentBack", documentBack);
      if (profileImage) data.append("profileImage", profileImage);

      await updateProfile(data).unwrap();

      toast.success("Profile updated successfully");
      onClose();
    } catch (err: any) {
      toast.error(err?.data?.message || "Update failed");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="w-[85vw] 
          sm:w-full 
          max-w-3xl 
          rounded-2xl 
          p-6 
          overflow-y-auto 
          max-h-[80vh]"
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Edit Profile</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Profile Image */}
          <div>
            <Label>Profile Image</Label>

            <div className="flex items-center gap-4 mt-2">
              {/* Existing or New Preview */}
              <div className="w-20 h-20 rounded-xl overflow-hidden border bg-slate-100">
                {profileImage ? (
                  <Image
                    src={URL.createObjectURL(profileImage)}
                    alt="Preview"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                ) : client?.profileImage ? (
                  <Image
                    src={client.profileImage}
                    alt="Profile"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                ) : null}
              </div>

              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setProfileImage(e.target.files?.[0] || null)}
              />
            </div>
          </div>

          {/* Company Details */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Company Name</Label>
              <Input
                value={formData.companyName}
                onChange={(e) =>
                  setFormData({ ...formData, companyName: e.target.value })
                }
              />
            </div>

            <div>
              <Label>Website</Label>
              <Input
                value={formData.companyWebsite}
                onChange={(e) =>
                  setFormData({ ...formData, companyWebsite: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <Label>Company About</Label>
            <Textarea
              rows={4}
              value={formData.companyAbout}
              onChange={(e) =>
                setFormData({ ...formData, companyAbout: e.target.value })
              }
            />
          </div>

          {/* Social Links */}
          <div className="grid md:grid-cols-3 gap-4">
            <Input
              placeholder="LinkedIn URL"
              value={formData.linkedinUrl}
              onChange={(e) =>
                setFormData({ ...formData, linkedinUrl: e.target.value })
              }
            />
            <Input
              placeholder="Twitter URL"
              value={formData.twitterUrl}
              onChange={(e) =>
                setFormData({ ...formData, twitterUrl: e.target.value })
              }
            />
            <Input
              placeholder="Facebook URL"
              value={formData.facebookUrl}
              onChange={(e) =>
                setFormData({ ...formData, facebookUrl: e.target.value })
              }
            />
          </div>

          {/* Document Section */}
          <div className="border-t pt-6 space-y-4">
            <h3 className="font-bold text-lg">Identity Verification</h3>

            <div>
              <Label>Document Type</Label>
              <Select
                value={formData.documentType}
                onValueChange={(value) =>
                  setFormData({ ...formData, documentType: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Document Type" />
                </SelectTrigger>
                <SelectContent>
                  {documentOptions.map((doc) => (
                    <SelectItem key={doc} value={doc}>
                      {doc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Document Number</Label>
              <Input
                value={formData.documentNumber}
                onChange={(e) =>
                  setFormData({ ...formData, documentNumber: e.target.value })
                }
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Front */}
              <div>
                <Label>Document Front</Label>

                <div className="mt-2 space-y-2">
                  <div className="w-full h-32 rounded-xl overflow-hidden border bg-slate-100">
                    {documentFront ? (
                      <Image
                        src={URL.createObjectURL(documentFront)}
                        alt="Front Preview"
                        width={300}
                        height={200}
                        className="w-full h-full object-cover"
                      />
                    ) : client?.documentFrontUrl ? (
                      <Image
                        src={client.documentFrontUrl}
                        alt="Front"
                        width={300}
                        height={200}
                        className="w-full h-full object-cover"
                      />
                    ) : null}
                  </div>

                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setDocumentFront(e.target.files?.[0] || null)
                    }
                  />
                </div>
              </div>

              {/* Back */}
              <div>
                <Label>Document Back</Label>

                <div className="mt-2 space-y-2">
                  <div className="w-full h-32 rounded-xl overflow-hidden border bg-slate-100">
                    {documentBack ? (
                      <Image
                        src={URL.createObjectURL(documentBack)}
                        alt="Back Preview"
                        width={300}
                        height={200}
                        className="w-full h-full object-cover"
                      />
                    ) : client?.documentBackUrl ? (
                      <Image
                        src={client.documentBackUrl}
                        alt="Back"
                        width={300}
                        height={200}
                        className="w-full h-full object-cover"
                      />
                    ) : null}
                  </div>

                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setDocumentBack(e.target.files?.[0] || null)
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit */}
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full rounded-xl mt-4 bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500  hover:bg-yellow-600" 
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : null}
            Update Profile
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
