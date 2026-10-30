"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SchoolAdminLogin() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const savedSchools = JSON.parse(localStorage.getItem("qubiq_schools") || "[]");
    const foundSchool = savedSchools.find(
      (school: any) => school.adminUsername === login && school.adminPass === password
    );

    if (foundSchool) {
      localStorage.setItem("userRole", "SCHOOL_ADMIN");
      localStorage.setItem("schoolId", foundSchool.id);
      localStorage.setItem("schoolName", foundSchool.name);
      router.push("/admin");
    } else if (login === "admin" && password === "admin123") {
      localStorage.setItem("userRole", "SCHOOL_ADMIN");
      localStorage.setItem("schoolId", "school_01");
      localStorage.setItem("schoolName", "Standart Maktab");
      router.push("/admin");
    } else {
      setError("Login yoki parol noto'g'ri!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white p-4">
      <div className="w-full max-w-md bg-slate-800 p-8 rounded-2xl shadow-xl border border-slate-700">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-500 tracking-wide">QUBIQ</h1>
          <p className="text-slate-400 text-sm mt-1">School Admin Paneliga kirish</p>
        </div>
        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm text-center">
            {error}
          </div>
        )}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Matnli Login</label>
            <input
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              placeholder="Masalan: school45_admin"
              required
              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl focus:outline-none focus:border-blue-500 text-white placeholder-slate-500 transition font-mono"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Parol</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl focus:outline-none focus:border-blue-500 text-white placeholder-slate-500 transition"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl transition duration-200 shadow-lg shadow-blue-600/30"
          >
            Tizimga kirish
          </button>
        </form>
      </div>
    </div>
  );
}
