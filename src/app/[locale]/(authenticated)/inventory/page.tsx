"use client";

import { useLocale, useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Plus, Package, AlertTriangle, Search, TrendingDown } from "lucide-react";

const mockProducts = [
  { id: "p1", sku: "MED-001", nameEn: "Metformin 500mg", nameAr: "ميتفورمين ٥٠٠ مجم", category: "medication", unit: "tablet", stock: 450, reorderLevel: 100, price: 5, expiry: "2027-06-15" },
  { id: "p2", sku: "MED-002", nameEn: "Amoxicillin 500mg", nameAr: "أموكسيسيلين ٥٠٠ مجم", category: "medication", unit: "capsule", stock: 8, reorderLevel: 50, price: 3, expiry: "2026-12-01" },
  { id: "p3", sku: "MED-003", nameEn: "Amlodipine 5mg", nameAr: "أملوديبين ٥ مجم", category: "medication", unit: "tablet", stock: 200, reorderLevel: 80, price: 4, expiry: "2027-09-30" },
  { id: "p4", sku: "MED-004", nameEn: "Omeprazole 20mg", nameAr: "أوميبرازول ٢٠ مجم", category: "medication", unit: "capsule", stock: 15, reorderLevel: 50, price: 6, expiry: "2026-05-10" },
  { id: "p5", sku: "SUP-001", nameEn: "Surgical Gloves (L)", nameAr: "قفازات جراحية (كبير)", category: "supply", unit: "box", stock: 45, reorderLevel: 20, price: 50, expiry: "2028-01-01" },
  { id: "p6", sku: "SUP-002", nameEn: "Disposable Syringes 5ml", nameAr: "حقن بلاستيكية ٥ مل", category: "supply", unit: "piece", stock: 500, reorderLevel: 200, price: 2, expiry: "2028-06-01" },
  { id: "p7", sku: "CON-001", nameEn: "Cotton Rolls", nameAr: "لفات قطنية", category: "consumable", unit: "pack", stock: 3, reorderLevel: 10, price: 25, expiry: "2027-12-31" },
  { id: "p8", sku: "MED-005", nameEn: "Paracetamol 500mg", nameAr: "باراسيتامول ٥٠٠ مجم", category: "medication", unit: "tablet", stock: 1000, reorderLevel: 200, price: 1, expiry: "2027-08-15" },
];

export default function InventoryPage() {
  const t = useTranslations();
  const locale = useLocale();

  const lowStockItems = mockProducts.filter((p) => p.stock <= p.reorderLevel);
  const expiringItems = mockProducts.filter((p) => {
    const exp = new Date(p.expiry);
    const threshold = new Date();
    threshold.setMonth(threshold.getMonth() + 3);
    return exp <= threshold;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t("inventory.title")}</h1>
        <Button><Plus className="h-4 w-4 me-2" />{t("inventory.newProduct")}</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <Package className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{mockProducts.length}</p>
              <p className="text-xs text-muted-foreground">{t("inventory.products")}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-red-100 dark:bg-red-900 flex items-center justify-center">
              <TrendingDown className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{lowStockItems.length}</p>
              <p className="text-xs text-muted-foreground">{t("inventory.lowStock")}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{expiringItems.length}</p>
              <p className="text-xs text-muted-foreground">{locale === "ar" ? "قارب على الانتهاء" : "Expiring Soon"}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center">
              <Package className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{mockProducts.reduce((sum, p) => sum + p.stock * p.price, 0).toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">{locale === "ar" ? "قيمة المخزون (ج.م)" : "Stock Value (EGP)"}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <TabsList>
            <TabsTrigger value="all">{t("common.all")}</TabsTrigger>
            <TabsTrigger value="medication">{t("inventory.medication")}</TabsTrigger>
            <TabsTrigger value="supply">{t("inventory.supply")}</TabsTrigger>
            <TabsTrigger value="consumable">{t("inventory.consumable")}</TabsTrigger>
            <TabsTrigger value="low">{t("inventory.lowStock")}</TabsTrigger>
          </TabsList>
          <div className="relative max-w-sm">
            <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder={t("actions.search")} className="ps-9" />
          </div>
        </div>

        {["all", "medication", "supply", "consumable", "low"].map((tab) => (
          <TabsContent key={tab} value={tab}>
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t("inventory.sku")}</TableHead>
                      <TableHead>{t("inventory.productName")}</TableHead>
                      <TableHead>{t("inventory.category")}</TableHead>
                      <TableHead>{t("inventory.currentStock")}</TableHead>
                      <TableHead>{t("inventory.reorderLevel")}</TableHead>
                      <TableHead>{t("inventory.expiryDate")}</TableHead>
                      <TableHead>{t("common.actions")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockProducts
                      .filter((p) => {
                        if (tab === "all") return true;
                        if (tab === "low") return p.stock <= p.reorderLevel;
                        return p.category === tab;
                      })
                      .map((product) => (
                        <TableRow key={product.id}>
                          <TableCell className="font-mono text-sm">{product.sku}</TableCell>
                          <TableCell className="font-medium">{locale === "ar" ? product.nameAr : product.nameEn}</TableCell>
                          <TableCell><Badge variant="outline">{product.category}</Badge></TableCell>
                          <TableCell>
                            <span className={product.stock <= product.reorderLevel ? "text-destructive font-bold" : ""}>
                              {product.stock}
                            </span>
                            {product.stock <= product.reorderLevel && (
                              <AlertTriangle className="inline ms-1 h-3 w-3 text-destructive" />
                            )}
                          </TableCell>
                          <TableCell>{product.reorderLevel}</TableCell>
                          <TableCell className="text-sm">{product.expiry}</TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button variant="ghost" size="sm">{t("actions.edit")}</Button>
                              <Button variant="ghost" size="sm">{t("inventory.receive")}</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
