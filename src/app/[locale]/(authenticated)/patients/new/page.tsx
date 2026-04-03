"use client";

import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { patientSchema, type PatientInput } from "@/lib/validators/patient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import {
  User,
  Phone,
  Shield,
  Heart,
  AlertTriangle,
} from "lucide-react";

export default function NewPatientPage() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PatientInput>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      nameEn: "",
      nameAr: "",
      nationalId: "",
      dateOfBirth: "",
      gender: "MALE",
      bloodType: "UNKNOWN",
      phonePrimary: "",
      phoneSecondary: "",
      email: "",
      addressEn: "",
      addressAr: "",
      nationality: "",
      maritalStatus: "",
      occupation: "",
      emergencyName: "",
      emergencyRelation: "",
      emergencyPhone: "",
      insuranceProvider: "",
      policyNumber: "",
      coverageType: "",
      insuranceExpiry: "",
      allergies: "",
      chronicConditions: "",
    },
  });

  const onSubmit = async (data: PatientInput) => {
    try {
      // Server action placeholder
      console.log("Patient data:", data);
      toast({
        title: t("patients.form.successTitle"),
        description: t("patients.form.successDescription"),
      });
      router.push(`/${locale}/patients`);
    } catch {
      toast({
        title: t("patients.form.errorTitle"),
        description: t("patients.form.errorDescription"),
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          {t("patients.newPatient")}
        </h1>
        <p className="text-muted-foreground">
          {t("patients.form.subtitle")}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              <CardTitle>{t("patients.form.personalInfo")}</CardTitle>
            </div>
            <CardDescription>{t("patients.form.personalInfoDesc")}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="nameEn">{t("patients.form.nameEn")} *</Label>
              <Input
                id="nameEn"
                {...register("nameEn")}
                placeholder={t("patients.form.nameEnPlaceholder")}
                dir="ltr"
              />
              {errors.nameEn && (
                <p className="text-sm text-destructive">{errors.nameEn.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="nameAr">{t("patients.form.nameAr")} *</Label>
              <Input
                id="nameAr"
                {...register("nameAr")}
                placeholder={t("patients.form.nameArPlaceholder")}
                dir="rtl"
              />
              {errors.nameAr && (
                <p className="text-sm text-destructive">{errors.nameAr.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="nationalId">{t("patients.form.nationalId")}</Label>
              <Input
                id="nationalId"
                {...register("nationalId")}
                placeholder={t("patients.form.nationalIdPlaceholder")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">{t("patients.form.dateOfBirth")} *</Label>
              <Input
                id="dateOfBirth"
                type="date"
                {...register("dateOfBirth")}
              />
              {errors.dateOfBirth && (
                <p className="text-sm text-destructive">{errors.dateOfBirth.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>{t("patients.form.gender")} *</Label>
              <Select
                value={watch("gender")}
                onValueChange={(value) => setValue("gender", value as "MALE" | "FEMALE")}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t("patients.form.selectGender")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MALE">{t("patients.genderOptions.male")}</SelectItem>
                  <SelectItem value="FEMALE">{t("patients.genderOptions.female")}</SelectItem>
                </SelectContent>
              </Select>
              {errors.gender && (
                <p className="text-sm text-destructive">{errors.gender.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>{t("patients.form.bloodType")}</Label>
              <Select
                value={watch("bloodType")}
                onValueChange={(value) =>
                  setValue("bloodType", value as PatientInput["bloodType"])
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder={t("patients.form.selectBloodType")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A_POS">A+</SelectItem>
                  <SelectItem value="A_NEG">A-</SelectItem>
                  <SelectItem value="B_POS">B+</SelectItem>
                  <SelectItem value="B_NEG">B-</SelectItem>
                  <SelectItem value="AB_POS">AB+</SelectItem>
                  <SelectItem value="AB_NEG">AB-</SelectItem>
                  <SelectItem value="O_POS">O+</SelectItem>
                  <SelectItem value="O_NEG">O-</SelectItem>
                  <SelectItem value="UNKNOWN">{t("patients.form.unknown")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="nationality">{t("patients.form.nationality")}</Label>
              <Input
                id="nationality"
                {...register("nationality")}
                placeholder={t("patients.form.nationalityPlaceholder")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maritalStatus">{t("patients.form.maritalStatus")}</Label>
              <Select
                value={watch("maritalStatus") || ""}
                onValueChange={(value) => setValue("maritalStatus", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t("patients.form.selectMaritalStatus")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">{t("patients.form.maritalOptions.single")}</SelectItem>
                  <SelectItem value="married">{t("patients.form.maritalOptions.married")}</SelectItem>
                  <SelectItem value="divorced">{t("patients.form.maritalOptions.divorced")}</SelectItem>
                  <SelectItem value="widowed">{t("patients.form.maritalOptions.widowed")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="occupation">{t("patients.form.occupation")}</Label>
              <Input
                id="occupation"
                {...register("occupation")}
                placeholder={t("patients.form.occupationPlaceholder")}
              />
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-primary" />
              <CardTitle>{t("patients.form.contactInfo")}</CardTitle>
            </div>
            <CardDescription>{t("patients.form.contactInfoDesc")}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="phonePrimary">{t("patients.form.phonePrimary")} *</Label>
              <Input
                id="phonePrimary"
                type="tel"
                {...register("phonePrimary")}
                placeholder="+966 5X XXX XXXX"
                dir="ltr"
              />
              {errors.phonePrimary && (
                <p className="text-sm text-destructive">{errors.phonePrimary.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneSecondary">{t("patients.form.phoneSecondary")}</Label>
              <Input
                id="phoneSecondary"
                type="tel"
                {...register("phoneSecondary")}
                placeholder="+966 5X XXX XXXX"
                dir="ltr"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{t("patients.form.email")}</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder={t("patients.form.emailPlaceholder")}
                dir="ltr"
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="addressEn">{t("patients.form.addressEn")}</Label>
              <Input
                id="addressEn"
                {...register("addressEn")}
                placeholder={t("patients.form.addressEnPlaceholder")}
                dir="ltr"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="addressAr">{t("patients.form.addressAr")}</Label>
              <Input
                id="addressAr"
                {...register("addressAr")}
                placeholder={t("patients.form.addressArPlaceholder")}
                dir="rtl"
              />
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contact */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <CardTitle>{t("patients.form.emergencyContact")}</CardTitle>
            </div>
            <CardDescription>{t("patients.form.emergencyContactDesc")}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="emergencyName">{t("patients.form.emergencyName")}</Label>
              <Input
                id="emergencyName"
                {...register("emergencyName")}
                placeholder={t("patients.form.emergencyNamePlaceholder")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="emergencyRelation">{t("patients.form.emergencyRelation")}</Label>
              <Input
                id="emergencyRelation"
                {...register("emergencyRelation")}
                placeholder={t("patients.form.emergencyRelationPlaceholder")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="emergencyPhone">{t("patients.form.emergencyPhone")}</Label>
              <Input
                id="emergencyPhone"
                type="tel"
                {...register("emergencyPhone")}
                placeholder="+966 5X XXX XXXX"
                dir="ltr"
              />
            </div>
          </CardContent>
        </Card>

        {/* Insurance Information */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <CardTitle>{t("patients.form.insuranceInfo")}</CardTitle>
            </div>
            <CardDescription>{t("patients.form.insuranceInfoDesc")}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="insuranceProvider">{t("patients.form.insuranceProvider")}</Label>
              <Input
                id="insuranceProvider"
                {...register("insuranceProvider")}
                placeholder={t("patients.form.insuranceProviderPlaceholder")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="policyNumber">{t("patients.form.policyNumber")}</Label>
              <Input
                id="policyNumber"
                {...register("policyNumber")}
                placeholder={t("patients.form.policyNumberPlaceholder")}
              />
            </div>

            <div className="space-y-2">
              <Label>{t("patients.form.coverageType")}</Label>
              <Select
                value={watch("coverageType") || ""}
                onValueChange={(value) => setValue("coverageType", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t("patients.form.selectCoverageType")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full">{t("patients.form.coverageOptions.full")}</SelectItem>
                  <SelectItem value="partial">{t("patients.form.coverageOptions.partial")}</SelectItem>
                  <SelectItem value="emergency">{t("patients.form.coverageOptions.emergency")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="insuranceExpiry">{t("patients.form.insuranceExpiry")}</Label>
              <Input
                id="insuranceExpiry"
                type="date"
                {...register("insuranceExpiry")}
              />
            </div>
          </CardContent>
        </Card>

        {/* Medical History */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-destructive" />
              <CardTitle>{t("patients.form.medicalHistory")}</CardTitle>
            </div>
            <CardDescription>{t("patients.form.medicalHistoryDesc")}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="allergies">{t("patients.form.allergies")}</Label>
              <Textarea
                id="allergies"
                {...register("allergies")}
                placeholder={t("patients.form.allergiesPlaceholder")}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="chronicConditions">{t("patients.form.chronicConditions")}</Label>
              <Textarea
                id="chronicConditions"
                {...register("chronicConditions")}
                placeholder={t("patients.form.chronicConditionsPlaceholder")}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push(`/${locale}/patients`)}
          >
            {t("actions.cancel")}
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? t("actions.saving") : t("patients.form.registerPatient")}
          </Button>
        </div>
      </form>
    </div>
  );
}
