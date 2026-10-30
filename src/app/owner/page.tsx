"use client";

import React, { useState, useEffect } from "react";

const REGIONS_DATA: Record<string, string[]> = {
  "Toshkent shahri": [
    "Bektemir tumani",
    "Chilonzor tumani",
    "Mirobod tumani",
    "Mirzo Ulug'bek tumani",
    "Sergeli tumani",
    "Shayxontohur tumani",
    "Olmazor tumani",
    "Uchtepa tumani",
    "Yakkasaroy tumani",
    "Yunusobod tumani",
    "Yangihayot tumani",
  ],
  "Toshkent viloyati": [
    "Angren sh.",
    "Bekobod sh.",
    "Chirchiq sh.",
    "Olmaliq sh.",
    "Yangiyo'l sh.",
    "Ohangaron sh.",
    "Bo'stonliq t.",
    "Zangiota t.",
    "Qibray t.",
    "Parkent t.",
    "Piskent t.",
    "Toshkent t.",
    "Chinoz t.",
    "Yuqori Chirchiq t.",
    "O'rta Chirchiq t.",
    "Quyi Chirchiq t.",
  ],
  "Samarqand viloyati": [
    "Samarqand sh.",
    "Kattaqo'rg'on sh.",
    "Bulung'ur t.",
    "Jomboy t.",
    "Ishtixon t.",
    "Narpay t.",
    "Nurabod t.",
    "Paxtachi t.",
    "Payariq t.",
    "Pastdarg'om t.",
    "Samarqand t.",
    "Toyloq t.",
    "Urgut t.",
  ],
  "Farg‘ona viloyati": [
    "Farg‘ona sh.",
    "Marg‘ilon sh.",
    "Qo‘qon sh.",
    "Quvasoy sh.",
    "Oltiariq t.",
    "Bag‘dod t.",
    "Beshariq t.",
    "Buvayda t.",
    "Dang‘ara t.",
    "Farg‘ona t.",
    "Furqat t.",
    "Qo‘shtepa t.",
    "Rishton t.",
    "Toshloq t.",
    "Uchko‘prik t.",
    "O‘zbekiston t.",
    "Yozyovon t.",
  ],
  "Andijon viloyati": [
    "Andijon sh.",
    "Xonobod sh.",
    "Asaka t.",
    "Baliqchi t.",
    "Bo‘z t.",
    "Buloqboshi t.",
    "Jalaquduq t.",
    "Izboskan t.",
    "Marhamat t.",
    "Oltinko‘l t.",
    "Paxtaobod t.",
    "Ulug‘nor t.",
    "Xo‘jaobod t.",
    "Shahrixon t.",
  ],
  "Namangan viloyati": [
    "Namangan sh.",
    "Chust t.",
    "Kosonsoy t.",
    "Mingbuloq t.",
    "Namangan t.",
    "Norin t.",
    "Pop t.",
    "To‘raqo‘rg‘on t.",
    "Uchqo‘rg‘on t.",
    "Uychi t.",
    "Chortoq t.",
  ],
  "Buxoro viloyati": [
    "Buxoro sh.",
    "Kogon sh.",
    "Buxoro t.",
    "Vobkent t.",
    "G‘ijduvon t.",
    "Jondor t.",
    "Qorovulbozor t.",
    "Peshku t.",
    "Romitan t.",
    "Olot t.",
    "Qorako‘l t.",
    "Shofirkon t.",
  ],
  "Navoiy viloyati": [
    "Navoiy sh.",
    "Zarafshon sh.",
    "G‘ozg‘on sh.",
    "Kanimex t.",
    "Karmana t.",
    "Qiziltepa t.",
    "Navbahor t.",
    "Nurota t.",
    "Tomdi t.",
    "Uchquduq t.",
    "Xatirchi t.",
  ],
  "Qashqadaryo viloyati": [
    "Qarshi sh.",
    "Shahrisabz sh.",
    "Chiroqchi t.",
    "Dehqonobod t.",
    "G‘uzor t.",
    "Kasbi t.",
    "Kitob t.",
    "Koson t.",
    "Mirishkor t.",
    "Muborak t.",
    "Nishon t.",
    "Qamashi t.",
    "Qarshi t.",
    "Yakkabog‘ t.",
  ],
  "Surxondaryo viloyati": [
    "Termiz sh.",
    "Angor t.",
    "Bandixon t.",
    "Boysun t.",
    "Denov t.",
    "Jarqo‘rg‘on t.",
    "Qiziriq t.",
    "Qumqo‘rg‘on t.",
    "Muzrabot t.",
    "Sariosiyo t.",
    "Sherobod t.",
    "Sho‘rchi t.",
    "Termiz t.",
    "Uzun t.",
  ],
  "Sirdaryo viloyati": [
    "Guliston sh.",
    "Shirin sh.",
    "Yangiyer sh.",
    "Boyovut t.",
    "Guliston t.",
    "Mirzaobod t.",
    "Oqoltin t.",
    "Sardoba t.",
    "Sayxunobod t.",
    "Sirdaryo t.",
    "Xovos t.",
  ],
  "Jizzax viloyati": [
    "Jizzax sh.",
    "Arnasoy t.",
    "Baxmal t.",
    "Do‘stlik t.",
    "Forish t.",
    "G‘allaorol t.",
    "Sharof Rashidov t.",
    "Mirzacho‘l t.",
    "Paxtakor t.",
    "Yangiobod t.",
    "Zafarobod t.",
    "Zarbdor t.",
  ],
  "Xorazm viloyati": [
    "Urganch sh.",
    "Xiva sh.",
    "Bog‘ot t.",
    "Gurlan t.",
    "Qoshko‘pir t.",
    "Xiva t.",
    "Xonqa t.",
    "Hazorasp t.",
    "Shovot t.",
    "Yangiariq t.",
    "Yangibozor t.",
  ],
  "Qoraqalpog‘iston Respublikasi": [
    "Nukus sh.",
    "Amudaryo t.",
    "Beruniy t.",
    "Bo‘zatov t.",
    "Qorao‘zak t.",
    "Kegeyli t.",
    "Qo‘ng‘irot t.",
    "Moynoq t.",
    "Nukus t.",
    "Qanliko‘l t.",
    "Chimboy t.",
    "Shumanay t.",
    "Ellikqal’a t.",
    "Taxtako‘pir t.",
    "Xo‘jayli t.",
  ],
};

interface School {
  id: string;
  name: string;
  region: string;
  district: string;
  adminName: string;
  adminUsername: string;
  adminPhone: string;
  adminPass: string;
  usersCount: number;
}

export default function OwnerDashboard() {
  const [schools, setSchools] = useState<School[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  const [isSchoolModalOpen, setIsSchoolModalOpen] = useState(false);
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [schoolForm, setSchoolForm] = useState({
    name: "",
    region: "Toshkent shahri",
    district: REGIONS_DATA["Toshkent shahri"][0],
    adminName: "",
    adminUsername: "",
    adminPhone: "",
    adminPass: "",
  });

  // Sahifa yuklanganda localStorage'dan ma'lumotlarni o'qib olish (eslab qolish)
  useEffect(() => {
    const savedSchools = localStorage.getItem("qubiq_schools");
    if (savedSchools) {
      try {
        setSchools(JSON.parse(savedSchools));
      } catch (e) {
        console.error("Ma'lumotlarni o'qishda xatolik:", e);
      }
    }
    setIsInitialized(true);
  }, []);

  // Har safar maktablar ro'yxati o'zgarganda localStorage'ga saqlab qo'yish
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("qubiq_schools", JSON.stringify(schools));
    }
  }, [schools, isInitialized]);

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedReg = e.target.value;
    const districtsList = REGIONS_DATA[selectedReg] || [];
    setSchoolForm({
      ...schoolForm,
      region: selectedReg,
      district: districtsList[0] || "",
    });
  };

  const handleCreateSchool = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !schoolForm.name ||
      !schoolForm.adminName ||
      !schoolForm.adminUsername ||
      !schoolForm.adminPass
    ) {
      alert("Iltimos, barcha majburiy maydonlarni to‘ldiring!");
      return;
    }

    const newSchool: School = {
      id: Date.now().toString(),
      name: schoolForm.name,
      region: schoolForm.region,
      district: schoolForm.district,
      adminName: schoolForm.adminName,
      adminUsername: schoolForm.adminUsername,
      adminPhone: schoolForm.adminPhone || "Kiritilmagan",
      adminPass: schoolForm.adminPass,
      usersCount: 1,
    };

    const updatedSchools = [newSchool, ...schools];
    setSchools(updatedSchools);
    setIsSchoolModalOpen(false);
    setSchoolForm({
      name: "",
      region: "Toshkent shahri",
      district: REGIONS_DATA["Toshkent shahri"][0],
      adminName: "",
      adminUsername: "",
      adminPhone: "",
      adminPass: "",
    });

    setSuccessMessage(
      `"${newSchool.name}" muvaffaqiyatli qo'shildi va xotirada saqlandi! Login: "${newSchool.adminUsername}"`,
    );
    setTimeout(() => setSuccessMessage(null), 6000);
  };

  const handleDeleteSchool = (schoolId: string) => {
    const updated = schools.filter((s) => s.id !== schoolId);
    setSchools(updated);
    setIsManageModalOpen(false);
    setSuccessMessage(
      "Maktab muvaffaqiyatli o'chirildi va xotiradan tozalandi!",
    );
    setTimeout(() => setSuccessMessage(null), 5000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div>
            <h1 className="text-2xl font-bold text-[#0B1220]">
              QUBIQ Platformasi — Tizim Egasining Paneli
            </h1>
            <p className="text-sm text-slate-500">
              Maktablar va administratorlarni markazlashgan boshqarish paneli
            </p>
          </div>
          <div>
            <button
              onClick={() => setIsSchoolModalOpen(true)}
              className="px-4 py-2.5 bg-[#0B1220] text-white font-medium text-sm rounded-xl hover:bg-slate-800 transition shadow-md"
            >
              + Yangi Maktab & Admin Qo‘shish
            </button>
          </div>
        </header>

        {/* Success Message */}
        {successMessage && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-5 py-4 rounded-2xl shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xl">✅</span>
              <span className="font-medium text-sm">{successMessage}</span>
            </div>
            <button
              onClick={() => setSuccessMessage(null)}
              className="text-emerald-600 font-bold"
            >
              ✕
            </button>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
            <span className="text-xs text-slate-400 font-semibold uppercase">
              Jami Maktablar
            </span>
            <div className="text-3xl font-extrabold text-[#0B1220] mt-1">
              {schools.length}
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
            <span className="text-xs text-slate-400 font-semibold uppercase">
              Jami Foydalanuvchilar
            </span>
            <div className="text-3xl font-extrabold text-blue-600 mt-1">
              {schools.reduce((acc, s) => acc + s.usersCount, 0)}
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
            <span className="text-xs text-slate-400 font-semibold uppercase">
              Tizim Holati
            </span>
            <div className="text-3xl font-extrabold text-emerald-500 mt-1">
              Faol
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-[#0B1220]">
              Ro‘yxatdan o‘tgan Maktablar
            </h2>
            <span className="text-xs text-slate-400">
              Jami: {schools.length} ta maktab
            </span>
          </div>

          {schools.length === 0 ? (
            <div className="p-12 text-center text-slate-400 space-y-2">
              <p className="text-base font-medium">
                Hozircha hech qanday maktab qo'shilmagan.
              </p>
              <p className="text-xs">
                Yuqoridagi "+ Yangi Maktab & Admin Qo'shish" tugmasini bosib
                birinchi maktabni qo'shing!
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-400 text-xs uppercase font-semibold border-b border-slate-100">
                    <th className="p-4">Maktab Nomi</th>
                    <th className="p-4">Hudud (Viloyat / Tuman)</th>
                    <th className="p-4">School Admin (Matnli Login)</th>
                    <th className="p-4">Foydalanuvchilar</th>
                    <th className="p-4 text-right">Amallar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {schools.map((school) => (
                    <tr
                      key={school.id}
                      className="hover:bg-slate-50 transition"
                    >
                      <td className="p-4 font-semibold text-[#0B1220]">
                        {school.name}
                      </td>
                      <td className="p-4 text-slate-600">
                        <div className="font-medium">{school.region}</div>
                        <div className="text-xs text-slate-400">
                          {school.district}
                        </div>
                      </td>
                      <td className="p-4 text-slate-600">
                        <div>{school.adminName}</div>
                        <div className="text-xs text-blue-600 font-mono font-bold">
                          Login: {school.adminUsername}
                        </div>
                        <div className="text-xs text-slate-400">
                          Tel: {school.adminPhone}
                        </div>
                      </td>
                      <td className="p-4 text-slate-600 font-medium">
                        {school.usersCount} ta
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => {
                            setSelectedSchool(school);
                            setIsManageModalOpen(true);
                          }}
                          className="px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg font-medium text-xs transition"
                        >
                          Boshqarish →
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal: Add School */}
      {isSchoolModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-xl space-y-5 my-8">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-lg font-bold text-[#0B1220]">
                Yangi Maktab va Admin Qo‘shish
              </h3>
              <button
                onClick={() => setIsSchoolModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSchool} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                  Maktab Nomi
                </label>
                <input
                  type="text"
                  placeholder="Masalan: 45-sonli umumta'lim maktabi"
                  required
                  value={schoolForm.name}
                  onChange={(e) =>
                    setSchoolForm({ ...schoolForm, name: e.target.value })
                  }
                  className="w-full p-2.5 border rounded-xl text-sm outline-none focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                    Viloyat
                  </label>
                  <select
                    value={schoolForm.region}
                    onChange={handleRegionChange}
                    className="w-full p-2.5 border rounded-xl text-sm bg-white outline-none focus:border-blue-600"
                  >
                    {Object.keys(REGIONS_DATA).map((reg) => (
                      <option key={reg} value={reg}>
                        {reg}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                    Tuman / Shahar
                  </label>
                  <select
                    value={schoolForm.district}
                    onChange={(e) =>
                      setSchoolForm({ ...schoolForm, district: e.target.value })
                    }
                    className="w-full p-2.5 border rounded-xl text-sm bg-white outline-none focus:border-blue-600"
                  >
                    {(REGIONS_DATA[schoolForm.region] || []).map((dist) => (
                      <option key={dist} value={dist}>
                        {dist}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="border-t pt-3 space-y-3">
                <h4 className="text-sm font-bold text-blue-600">
                  Maktab Administratori (Direktor) Ma'lumotlari
                </h4>
                <input
                  type="text"
                  placeholder="Direktor F.I.SH"
                  required
                  value={schoolForm.adminName}
                  onChange={(e) =>
                    setSchoolForm({ ...schoolForm, adminName: e.target.value })
                  }
                  className="w-full p-2.5 border rounded-xl text-sm outline-none focus:border-blue-600"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                      Matnli Login
                    </label>
                    <input
                      type="text"
                      placeholder="Masalan: school45_admin"
                      required
                      value={schoolForm.adminUsername}
                      onChange={(e) =>
                        setSchoolForm({
                          ...schoolForm,
                          adminUsername: e.target.value,
                        })
                      }
                      className="w-full p-2.5 border rounded-xl text-sm outline-none focus:border-blue-600 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                      Parol
                    </label>
                    <input
                      type="text"
                      placeholder="Parol yaratish"
                      required
                      value={schoolForm.adminPass}
                      onChange={(e) =>
                        setSchoolForm({
                          ...schoolForm,
                          adminPass: e.target.value,
                        })
                      }
                      className="w-full p-2.5 border rounded-xl text-sm outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                    Telefon Raqami (Faqat aloqa uchun)
                  </label>
                  <input
                    type="text"
                    placeholder="+998 -- --- -- --"
                    value={schoolForm.adminPhone}
                    onChange={(e) =>
                      setSchoolForm({
                        ...schoolForm,
                        adminPhone: e.target.value,
                      })
                    }
                    className="w-full p-2.5 border rounded-xl text-sm outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setIsSchoolModalOpen(false)}
                  className="px-4 py-2 text-sm text-slate-500 hover:text-slate-700 font-medium"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-sm bg-[#0B1220] text-white rounded-xl hover:bg-slate-800 font-medium shadow-md"
                >
                  Maktabni Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Manage School */}
      {isManageModalOpen && selectedSchool && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-xl space-y-5">
            <div className="flex justify-between items-center border-b pb-3">
              <div>
                <h3 className="text-lg font-bold text-[#0B1220]">
                  {selectedSchool.name}
                </h3>
                <p className="text-xs text-slate-400">
                  {selectedSchool.region}, {selectedSchool.district}
                </p>
              </div>
              <button
                onClick={() => setIsManageModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2">
                <h4 className="font-bold text-slate-700 uppercase text-xs">
                  Maktab Administratori (Login Ma'lumotlari)
                </h4>
                <div className="grid grid-cols-2 gap-2 text-slate-600">
                  <div>
                    <strong>Direktor:</strong> {selectedSchool.adminName}
                  </div>
                  <div>
                    <strong>Matnli Login:</strong>{" "}
                    <span className="text-blue-600 font-mono font-bold">
                      {selectedSchool.adminUsername}
                    </span>
                  </div>
                  <div>
                    <strong>Parol:</strong>{" "}
                    <span className="bg-slate-200 px-2 py-0.5 rounded font-mono text-xs">
                      {selectedSchool.adminPass}
                    </span>
                  </div>
                  <div>
                    <strong>Aloqa Tel:</strong> {selectedSchool.adminPhone}
                  </div>
                </div>
              </div>

              <div className="p-4 border rounded-xl space-y-2">
                <h4 className="font-bold text-slate-700 text-xs uppercase">
                  Tezkor Amallar
                </h4>
                <div className="flex gap-2">
                  <button
                    onClick={() => alert("Admin paroli yangilandi!")}
                    className="px-3 py-2 bg-amber-50 text-amber-600 hover:bg-amber-100 rounded-lg text-xs font-medium"
                  >
                    Parolni Tiklash
                  </button>
                  <button
                    onClick={() => handleDeleteSchool(selectedSchool.id)}
                    className="px-3 py-2 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg text-xs font-medium ml-auto"
                  >
                    Maktabni O'chirish
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t">
              <button
                onClick={() => setIsManageModalOpen(false)}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-sm font-medium transition"
              >
                Yopish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
