"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SchoolAdminDashboard() {
  const router = useRouter();
  const [schoolName, setSchoolName] = useState<string>(
    "QUBIQ Zamonaviy Maktabi",
  );
  const [schoolId, setSchoolId] = useState<string>("school_01");
  const [activeTab, setActiveTab] = useState<string>("dashboard");

  // Qidiruv state'lari
  const [teacherSearch, setTeacherSearch] = useState<string>("");
  const [studentSearch, setStudentSearch] = useState<string>("");

  // Ma'lumotlar bazasi (LocalStorage dan o'qish yoki boshlang'ich qiymat)
  const [teachers, setTeachers] = useState<
    Array<{
      id: string;
      name: string;
      subject: string;
      phone: string;
      username: string;
      pass: string;
      classAssigned: string;
    }>
  >([
    {
      id: "1",
      name: "Aziz Rahimov",
      subject: "Matematika",
      phone: "+998 90 123 45 67",
      username: "aziz_math",
      pass: "123456",
      classAssigned: "10-A",
    },
  ]);

  const [students, setStudents] = useState<
    Array<{
      id: string;
      fullName: string;
      className: string;
      parentPhone: string;
      username: string;
      pass: string;
    }>
  >([
    {
      id: "1",
      fullName: "Jasur Valiyev",
      className: "10-A",
      parentPhone: "+998 93 555 44 33",
      username: "jasur_student",
      pass: "student123",
    },
  ]);

  const [deputyHeads, setDeputyHeads] = useState<
    Array<{
      id: string;
      name: string;
      phone: string;
      username: string;
      pass: string;
    }>
  >([
    {
      id: "1",
      name: "Dilfuza Umarova",
      phone: "+998 91 111 22 33",
      username: "zavuch_dilfuza",
      pass: "zavuch123",
    },
  ]);

  const [classes, setClasses] = useState<
    Array<{ id: string; className: string; classTeacher: string }>
  >([
    { id: "1", className: "10-A", classTeacher: "Aziz Rahimov" },
    { id: "2", className: "11-B", classTeacher: "Dilfuza Umarova" },
  ]);

  const [subjects, setSubjects] = useState<
    Array<{ id: string; name: string; code: string }>
  >([
    { id: "1", name: "Matematika", code: "MATH-01" },
    { id: "2", name: "Fizika", code: "PHYS-02" },
  ]);

  const [announcements, setAnnouncements] = useState<
    Array<{
      id: string;
      title: string;
      content: string;
      target: string;
      date: string;
    }>
  >([
    {
      id: "1",
      title: "Ota-onalar majlisi",
      content: "Chorshanba kuni soat 15:00 da umumiy majlis bo'lib o'tadi.",
      target: "Hamma uchun",
      date: new Date().toLocaleDateString(),
    },
  ]);

  const [parentRequests, setParentRequests] = useState<
    Array<{
      id: string;
      studentName: string;
      className: string;
      reason: string;
      date: string;
      status: "Kutilmoqda" | "Tasdiqlandi" | "Rad etildi";
    }>
  >([
    {
      id: "1",
      studentName: "Jasur Valiyev",
      className: "10-A",
      reason: "O'tkir shamollash va isitma",
      date: new Date().toLocaleDateString(),
      status: "Kutilmoqda",
    },
  ]);

  const [attendanceRecords, setAttendanceRecords] = useState<
    Array<{
      id: string;
      className: string;
      teacher: string;
      status: string;
      lastUpdated: string;
    }>
  >([
    {
      id: "1",
      className: "10-A",
      teacher: "Aziz Rahimov",
      status: "Topshirildi",
      lastUpdated: "08:02",
    },
  ]);

  const [activityLogs, setActivityLogs] = useState<
    Array<{ id: string; action: string; time: string; user: string }>
  >([
    {
      id: "1",
      action: "Tizimga kirildi",
      time: new Date().toLocaleTimeString(),
      user: "School Admin",
    },
  ]);

  const [schoolSettings, setSchoolSettings] = useState({
    name: "QUBIQ Zamonaviy Maktabi",
    address: "Toshkent shahri, Chilonzor tumani",
    phone: "+998 71 200 00 00",
    startTime: "08:00",
  });

  // Form input state'lari
  const [tName, setTName] = useState("");
  const [tSubject, setTSubject] = useState("");
  const [tPhone, setTPhone] = useState("");
  const [tUsername, setTUsername] = useState("");
  const [tPass, setTPass] = useState("");
  const [tClass, setTClass] = useState("");
  const [sName, setSName] = useState("");
  const [sClass, setSClass] = useState("10-A");
  const [sParentPhone, setSParentPhone] = useState("");
  const [sUsername, setSUsername] = useState("");
  const [sPass, setSPass] = useState("");
  const [dName, setDName] = useState("");
  const [dPhone, setDPhone] = useState("");
  const [dUsername, setDUsername] = useState("");
  const [dPass, setDPass] = useState("");
  const [classNameInput, setClassNameInput] = useState("");
  const [selectedTeacherForClass, setSelectedTeacherForClass] = useState("");
  const [subName, setSubName] = useState("");
  const [subCode, setSubCode] = useState("");
  const [annTitle, setAnnTitle] = useState("");
  const [annContent, setAnnContent] = useState("");
  const [annTarget, setAnnTarget] = useState("Hamma uchun");
  const [pStudentName, setPStudentName] = useState("");
  const [pReason, setPReason] = useState("");

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    const name = localStorage.getItem("schoolName");
    const sId = localStorage.getItem("schoolId");

    if (role !== "SCHOOL_ADMIN") {
      router.push("/login");
    } else {
      if (name) setSchoolName(name);
      if (sId) setSchoolId(sId);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.clear();
    router.push("/login");
  };

  const logActivity = (actionText: string) => {
    const newLog = {
      id: Date.now().toString(),
      action: actionText,
      time: new Date().toLocaleTimeString(),
      user: "School Admin",
    };
    setActivityLogs((prev) => [newLog, ...prev]);
  };

  // Handlerlar
  const handleAddTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tName || !tUsername || !tPass) return;
    setTeachers([
      ...teachers,
      {
        id: Date.now().toString(),
        name: tName,
        subject: tSubject || "Umumiy",
        phone: tPhone,
        username: tUsername,
        pass: tPass,
        classAssigned: tClass || "Yo'q",
      },
    ]);
    logActivity(`Yangi o'qituvchi qo'shildi: ${tName}`);
    setTName("");
    setTSubject("");
    setTPhone("");
    setTUsername("");
    setTPass("");
    setTClass("");
    alert("O'qituvchi muvaffaqiyatli qo'shildi!");
  };

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sName || !sUsername || !sPass) return;
    setStudents([
      ...students,
      {
        id: Date.now().toString(),
        fullName: sName,
        className: sClass,
        parentPhone: sParentPhone,
        username: sUsername,
        pass: sPass,
      },
    ]);
    logActivity(`O'quvchi qo'shildi: ${sName} (${sClass})`);
    setSName("");
    setSParentPhone("");
    setSUsername("");
    setSPass("");
    alert("O'quvchi muvaffaqiyatli qo'shildi!");
  };

  const handleAddDeputy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dName || !dUsername || !dPass) return;
    setDeputyHeads([
      ...deputyHeads,
      {
        id: Date.now().toString(),
        name: dName,
        phone: dPhone,
        username: dUsername,
        pass: dPass,
      },
    ]);
    logActivity(`Zavuch qo'shildi: ${dName}`);
    setDName("");
    setDPhone("");
    setDUsername("");
    setDPass("");
    alert("Zavuch muvaffaqiyatli qo'shildi!");
  };

  const handleAddClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!classNameInput) return;
    setClasses([
      ...classes,
      {
        id: Date.now().toString(),
        className: classNameInput,
        classTeacher: selectedTeacherForClass || "Tayinlanmagan",
      },
    ]);
    logActivity(`Sinf ochildi: ${classNameInput}`);
    setClassNameInput("");
    setSelectedTeacherForClass("");
    alert("Sinf muvaffaqiyatli qo'shildi!");
  };

  const handleAddSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subName) return;
    setSubjects([
      ...subjects,
      {
        id: Date.now().toString(),
        name: subName,
        code: subCode || `SUB-${Date.now().toString().slice(-2)}`,
      },
    ]);
    logActivity(`Fan qo'shildi: ${subName}`);
    setSubName("");
    setSubCode("");
    alert("Fan muvaffaqiyatli qo'shildi!");
  };

  const handleAddAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle || !annContent) return;
    setAnnouncements([
      {
        id: Date.now().toString(),
        title: annTitle,
        content: annContent,
        target: annTarget,
        date: new Date().toLocaleDateString(),
      },
      ...announcements,
    ]);
    logActivity(`E'lon joylandi: ${annTitle}`);
    setAnnTitle("");
    setAnnContent("");
    alert("E'lon e'lon qilindi!");
  };

  const handleAddParentRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pStudentName || !pReason) return;
    setParentRequests([
      {
        id: Date.now().toString(),
        studentName: pStudentName,
        className: sClass,
        reason: pReason,
        date: new Date().toLocaleDateString(),
        status: "Kutilmoqda",
      },
      ...parentRequests,
    ]);
    logActivity(`Ota-ona arizasi qabul qilindi: ${pStudentName}`);
    setPStudentName("");
    setPReason("");
    alert("Ariza yuborildi!");
  };

  const handleUpdateRequestStatus = (
    id: string,
    newStatus: "Tasdiqlandi" | "Rad etildi",
  ) => {
    setParentRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r)),
    );
    logActivity(`Ariza holati o'zgartirildi: ${newStatus}`);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSchoolName(schoolSettings.name);
    localStorage.setItem("schoolName", schoolSettings.name);
    logActivity("Maktab sozlamalari yangilandi");
    alert("Sozlamalar saqlandi!");
  };

  // Excel/CSV import
  const handleTeacherFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const lines = text.split("\n");
      const newTeachers = [...teachers];
      for (let i = 1; i < lines.length; i++) {
        const row = lines[i].trim();
        if (!row) continue;
        const cols = row.split(",");
        if (cols.length >= 5) {
          newTeachers.push({
            id: Date.now().toString() + i,
            name: cols[0].trim(),
            subject: cols[1].trim(),
            phone: cols[2].trim(),
            username: cols[3].trim(),
            pass: cols[4].trim(),
            classAssigned: cols[5] ? cols[5].trim() : "Yo'q",
          });
        }
      }
      setTeachers(newTeachers);
      logActivity("Excel orqali o'qituvchilar import qilindi");
      alert("O'qituvchilar muvaffaqiyatli import qilindi!");
    };
    reader.readAsText(file);
  };

  const handleStudentFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const lines = text.split("\n");
      const newStudents = [...students];
      for (let i = 1; i < lines.length; i++) {
        const row = lines[i].trim();
        if (!row) continue;
        const cols = row.split(",");
        if (cols.length >= 5) {
          newStudents.push({
            id: Date.now().toString() + i,
            fullName: cols[0].trim(),
            className: cols[1].trim(),
            parentPhone: cols[2].trim(),
            username: cols[3].trim(),
            pass: cols[4].trim(),
          });
        }
      }
      setStudents(newStudents);
      logActivity("Excel orqali o'quvchilar import qilindi");
      alert("O'quvchilar muvaffaqiyatli import qilindi!");
    };
    reader.readAsText(file);
  };

  const exportToCSV = (type: string, data: any[]) => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      data.map((e) => Object.values(e).join(",")).join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", `${type}_export.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredTeachers = teachers.filter(
    (t) =>
      t.name.toLowerCase().includes(teacherSearch.toLowerCase()) ||
      t.subject.toLowerCase().includes(teacherSearch.toLowerCase()),
  );
  const filteredStudents = students.filter(
    (s) =>
      s.fullName.toLowerCase().includes(studentSearch.toLowerCase()) ||
      s.className.toLowerCase().includes(studentSearch.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-slate-800 border-r border-slate-700 p-4 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          <div className="px-2">
            <h2 className="text-xl font-extrabold text-blue-500 tracking-wider">
              QUBIQ
            </h2>
            <p className="text-xs text-slate-400 mt-0.5 truncate">
              {schoolName}
            </p>
          </div>

          <nav className="space-y-1 text-sm">
            {[
              { id: "dashboard", label: "1. Dashboard", icon: "📊" },
              {
                id: "add_teacher",
                label: "2. O‘qituvchi qo‘shish",
                icon: "➕",
              },
              {
                id: "teachers_list",
                label: "3. O‘qituvchilar ro‘yxati",
                icon: "👨‍🏫",
              },
              { id: "add_student", label: "4. O‘quvchi qo‘shish", icon: "➕" },
              {
                id: "students_list",
                label: "5. O‘quvchilar ro‘yxati",
                icon: "👨‍🎓",
              },
              { id: "parents", label: "6. Ota-onalar Kabineti", icon: "👪" },
              { id: "classes", label: "7. Sinflar va Rahbarlar", icon: "🏫" },
              { id: "subjects", label: "8. Fanlar", icon: "📚" },
              { id: "deputies", label: "9. Zavuchlar", icon: "👩‍💼" },
              { id: "announcements", label: "10. E’lonlar paneli", icon: "📢" },
              { id: "attendance", label: "11. Davomat nazorati", icon: "⚡" },
              { id: "reports", label: "12. Hisobotlar", icon: "📈" },
              { id: "settings", label: "13. Maktab sozlamalari", icon: "⚙️" },
              { id: "logs", label: "14. Faollik tarixi", icon: "📜" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl font-medium transition ${
                  activeTab === item.id
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-slate-300 hover:bg-slate-700/50"
                }`}
              >
                <span>{item.icon}</span>
                <span className="truncate">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="pt-4 border-t border-slate-700 mt-4">
          <button
            onClick={handleLogout}
            className="w-full py-2.5 bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/30 text-sm font-medium rounded-xl transition"
          >
            Chiqish
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-8 overflow-y-auto space-y-6">
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 flex justify-between items-center shadow-xl">
              <div>
                <h1 className="text-2xl font-bold text-blue-400">
                  {schoolName} — Admin Dashboardi
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  Maktab ID:{" "}
                  <span className="font-mono text-blue-300">{schoolId}</span>
                </p>
              </div>
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-semibold">
                Tizim Faol
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700">
                <span className="text-xs text-slate-400 font-semibold uppercase">
                  O'qituvchilar
                </span>
                <div className="text-3xl font-extrabold text-white mt-1">
                  {teachers.length}
                </div>
              </div>
              <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700">
                <span className="text-xs text-slate-400 font-semibold uppercase">
                  O'quvchilar
                </span>
                <div className="text-3xl font-extrabold text-blue-400 mt-1">
                  {students.length}
                </div>
              </div>
              <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700">
                <span className="text-xs text-slate-400 font-semibold uppercase">
                  Sinflar
                </span>
                <div className="text-3xl font-extrabold text-emerald-400 mt-1">
                  {classes.length}
                </div>
              </div>
              <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700">
                <span className="text-xs text-slate-400 font-semibold uppercase">
                  Fanlar
                </span>
                <div className="text-3xl font-extrabold text-amber-400 mt-1">
                  {subjects.length}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. O'QITUVCHI QO'SHISH */}
        {activeTab === "add_teacher" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-4">
              <h2 className="text-lg font-bold text-white">
                ➕ Yangi O'qituvchi Qo'shish
              </h2>
              <form onSubmit={handleAddTeacher} className="space-y-3">
                <input
                  type="text"
                  value={tName}
                  onChange={(e) => setTName(e.target.value)}
                  placeholder="F.I.O"
                  required
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm"
                />
                <input
                  type="text"
                  value={tSubject}
                  onChange={(e) => setTSubject(e.target.value)}
                  placeholder="Fani"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm"
                />
                <input
                  type="text"
                  value={tClass}
                  onChange={(e) => setTClass(e.target.value)}
                  placeholder="Sinf rahbarligi (Masalan: 10-A)"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm"
                />
                <input
                  type="text"
                  value={tPhone}
                  onChange={(e) => setTPhone(e.target.value)}
                  placeholder="Telefon"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm"
                />
                <input
                  type="text"
                  value={tUsername}
                  onChange={(e) => setTUsername(e.target.value)}
                  placeholder="Login"
                  required
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm font-mono"
                />
                <input
                  type="password"
                  value={tPass}
                  onChange={(e) => setTPass(e.target.value)}
                  placeholder="Parol"
                  required
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-blue-600 hover:bg-blue-500 rounded-xl text-sm font-medium"
                >
                  Saqlash
                </button>
              </form>
            </div>
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-4">
              <h2 className="text-lg font-bold text-white">
                📁 Excel / CSV Orqali Import Qilish
              </h2>
              <p className="text-xs text-slate-400">
                Format:{" "}
                <code className="text-amber-400">
                  F.I.O, Fani, Telefon, Login, Parol, Sinf
                </code>
              </p>
              <label className="block w-full py-8 border-2 border-dashed border-slate-700 hover:border-blue-500 rounded-2xl text-center cursor-pointer bg-slate-900/50 transition">
                <span className="text-sm text-blue-400 font-semibold">
                  Excel faylni tanlang (CSV)
                </span>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleTeacherFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        )}

        {/* 3. O'QITUVCHILAR RO'YXATI */}
        {activeTab === "teachers_list" && (
          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-lg font-bold text-white">
                👨‍🏫 O'qituvchilar Ro'yxati
              </h2>
              <div className="flex gap-2 w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Qidirish..."
                  value={teacherSearch}
                  onChange={(e) => setTeacherSearch(e.target.value)}
                  className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white w-full sm:w-64"
                />
                <button
                  onClick={() => exportToCSV("teachers", teachers)}
                  className="px-3 py-2 bg-slate-700 text-xs rounded-xl hover:bg-slate-600"
                >
                  Eksport
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-slate-900 uppercase text-xs text-slate-400">
                  <tr>
                    <th className="p-3">F.I.O</th>
                    <th className="p-3">Fani</th>
                    <th className="p-3">Sinf Rahbarligi</th>
                    <th className="p-3">Login / Parol</th>
                    <th className="p-3">Telefon</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {filteredTeachers.map((t) => (
                    <tr key={t.id}>
                      <td className="p-3 font-medium text-white">{t.name}</td>
                      <td className="p-3 text-blue-400">{t.subject}</td>
                      <td className="p-3 font-bold text-emerald-400">
                        {t.classAssigned || "Yo'q"}
                      </td>
                      <td className="p-3 font-mono text-xs text-amber-400">
                        {t.username} / {t.pass}
                      </td>
                      <td className="p-3 text-slate-400">{t.phone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 4. O'QUVCHI QO'SHISH */}
        {activeTab === "add_student" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-4">
              <h2 className="text-lg font-bold text-white">
                ➕ Yangi O'quvchi Qo'shish
              </h2>
              <form onSubmit={handleAddStudent} className="space-y-3">
                <input
                  type="text"
                  value={sName}
                  onChange={(e) => setSName(e.target.value)}
                  placeholder="O'quvchi F.I.O"
                  required
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm"
                />
                <select
                  value={sClass}
                  onChange={(e) => setSClass(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm"
                >
                  {classes.map((c) => (
                    <option key={c.id} value={c.className}>
                      {c.className}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  value={sParentPhone}
                  onChange={(e) => setSParentPhone(e.target.value)}
                  placeholder="Ota-ona telefoni"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm"
                />
                <input
                  type="text"
                  value={sUsername}
                  onChange={(e) => setSUsername(e.target.value)}
                  placeholder="Login"
                  required
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm font-mono"
                />
                <input
                  type="password"
                  value={sPass}
                  onChange={(e) => setSPass(e.target.value)}
                  placeholder="Parol"
                  required
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-blue-600 hover:bg-blue-500 rounded-xl text-sm font-medium"
                >
                  Saqlash
                </button>
              </form>
            </div>
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-4">
              <h2 className="text-lg font-bold text-white">
                📁 Excel / CSV Orqali Import Qilish
              </h2>
              <p className="text-xs text-slate-400">
                Format:{" "}
                <code className="text-amber-400">
                  F.I.O, Sinf, Ota-ona Tel, Login, Parol
                </code>
              </p>
              <label className="block w-full py-8 border-2 border-dashed border-slate-700 hover:border-blue-500 rounded-2xl text-center cursor-pointer bg-slate-900/50 transition">
                <span className="text-sm text-blue-400 font-semibold">
                  Excel faylni tanlang (CSV)
                </span>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleStudentFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        )}

        {/* 5. O'QUVCHILAR RO'YXATI */}
        {activeTab === "students_list" && (
          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-lg font-bold text-white">
                👨‍🎓 O'quvchilar Ro'yxati
              </h2>
              <div className="flex gap-2 w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Qidirish..."
                  value={studentSearch}
                  onChange={(e) => setStudentSearch(e.target.value)}
                  className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white w-full sm:w-64"
                />
                <button
                  onClick={() => exportToCSV("students", students)}
                  className="px-3 py-2 bg-slate-700 text-xs rounded-xl hover:bg-slate-600"
                >
                  Eksport
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-slate-900 uppercase text-xs text-slate-400">
                  <tr>
                    <th className="p-3">F.I.O</th>
                    <th className="p-3">Sinf</th>
                    <th className="p-3">Login / Parol</th>
                    <th className="p-3">Ota-ona Tel</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {filteredStudents.map((s) => (
                    <tr key={s.id}>
                      <td className="p-3 font-medium text-white">
                        {s.fullName}
                      </td>
                      <td className="p-3 text-emerald-400">{s.className}</td>
                      <td className="p-3 font-mono text-xs text-amber-400">
                        {s.username} / {s.pass}
                      </td>
                      <td className="p-3 text-slate-400">{s.parentPhone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 6. OTA-ONALAR KABINETI */}
        {activeTab === "parents" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-4">
              <h2 className="text-lg font-bold text-white">
                Sababli Ariza Qo'shish
              </h2>
              <form onSubmit={handleAddParentRequest} className="space-y-3">
                <input
                  type="text"
                  value={pStudentName}
                  onChange={(e) => setPStudentName(e.target.value)}
                  placeholder="O'quvchi F.I.O"
                  required
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm"
                />
                <textarea
                  value={pReason}
                  onChange={(e) => setPReason(e.target.value)}
                  placeholder="Sababi..."
                  required
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm h-24"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-amber-600 hover:bg-amber-500 rounded-xl text-sm font-medium"
                >
                  Yuborish
                </button>
              </form>
            </div>
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 lg:col-span-2 overflow-x-auto">
              <h2 className="text-lg font-bold text-white mb-4">
                Kelmaganlik Sabablari
              </h2>
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-slate-900 uppercase text-xs text-slate-400">
                  <tr>
                    <th className="p-3">O'quvchi</th>
                    <th className="p-3">Sababi</th>
                    <th className="p-3">Holat</th>
                    <th className="p-3">Amal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {parentRequests.map((req) => (
                    <tr key={req.id}>
                      <td className="p-3 font-medium text-white">
                        {req.studentName}
                      </td>
                      <td className="p-3 text-slate-300">{req.reason}</td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-1 rounded text-xs font-bold ${req.status === "Tasdiqlandi" ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"}`}
                        >
                          {req.status}
                        </span>
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() =>
                            handleUpdateRequestStatus(req.id, "Tasdiqlandi")
                          }
                          className="px-2 py-1 bg-emerald-600 text-xs rounded hover:bg-emerald-500"
                        >
                          Tasdiqlash
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 7. SINFLAR VA RAHBARLAR */}
        {activeTab === "classes" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-4">
              <h2 className="text-lg font-bold text-white">
                Yangi Sinf Ochish
              </h2>
              <form onSubmit={handleAddClass} className="space-y-3">
                <input
                  type="text"
                  value={classNameInput}
                  onChange={(e) => setClassNameInput(e.target.value)}
                  placeholder="Sinf (Masalan: 10-A)"
                  required
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm"
                />
                <select
                  value={selectedTeacherForClass}
                  onChange={(e) => setSelectedTeacherForClass(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm"
                >
                  <option value="">Sinf rahbarini tanlang</option>
                  {teachers.map((t) => (
                    <option key={t.id} value={t.name}>
                      {t.name}
                    </option>
                  ))}
                </select>
                <button
                  type="submit"
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-sm font-medium"
                >
                  Saqlash
                </button>
              </form>
            </div>
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {classes.map((c) => (
                <div
                  key={c.id}
                  className="p-4 bg-slate-900 rounded-xl border border-slate-700 space-y-1"
                >
                  <h3 className="font-bold text-emerald-400 text-lg">
                    {c.className} sinf
                  </h3>
                  <p className="text-xs text-slate-300">
                    Rahbar:{" "}
                    <span className="font-semibold text-white">
                      {c.classTeacher}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 8. FANLAR */}
        {activeTab === "subjects" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-4">
              <h2 className="text-lg font-bold text-white">Fan Qo'shish</h2>
              <form onSubmit={handleAddSubject} className="space-y-3">
                <input
                  type="text"
                  value={subName}
                  onChange={(e) => setSubName(e.target.value)}
                  placeholder="Fan nomi (Biologiya)"
                  required
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm"
                />
                <input
                  type="text"
                  value={subCode}
                  onChange={(e) => setSubCode(e.target.value)}
                  placeholder="Kodi (BIO-01)"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm font-mono"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-blue-600 hover:bg-blue-500 rounded-xl text-sm font-medium"
                >
                  Qo'shish
                </button>
              </form>
            </div>
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 lg:col-span-2 overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-slate-900 uppercase text-xs text-slate-400">
                  <tr>
                    <th className="p-3">Fan Nomi</th>
                    <th className="p-3">Kodi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {subjects.map((sub) => (
                    <tr key={sub.id}>
                      <td className="p-3 font-medium text-white">{sub.name}</td>
                      <td className="p-3 font-mono text-xs text-blue-400">
                        {sub.code}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 9. ZAVUCHLAR */}
        {activeTab === "deputies" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-4">
              <h2 className="text-lg font-bold text-white">Zavuch Tayinlash</h2>
              <form onSubmit={handleAddDeputy} className="space-y-3">
                <input
                  type="text"
                  value={dName}
                  onChange={(e) => setDName(e.target.value)}
                  placeholder="F.I.O"
                  required
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm"
                />
                <input
                  type="text"
                  value={dPhone}
                  onChange={(e) => setDPhone(e.target.value)}
                  placeholder="Telefon"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm"
                />
                <input
                  type="text"
                  value={dUsername}
                  onChange={(e) => setDUsername(e.target.value)}
                  placeholder="Login"
                  required
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm font-mono"
                />
                <input
                  type="password"
                  value={dPass}
                  onChange={(e) => setDPass(e.target.value)}
                  placeholder="Parol"
                  required
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-amber-600 hover:bg-amber-500 rounded-xl text-sm font-medium"
                >
                  Saqlash
                </button>
              </form>
            </div>
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 lg:col-span-2 overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-slate-900 uppercase text-xs text-slate-400">
                  <tr>
                    <th className="p-3">F.I.O</th>
                    <th className="p-3">Login / Parol</th>
                    <th className="p-3">Telefon</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {deputyHeads.map((d) => (
                    <tr key={d.id}>
                      <td className="p-3 font-medium text-white">{d.name}</td>
                      <td className="p-3 font-mono text-xs text-amber-400">
                        {d.username} / {d.pass}
                      </td>
                      <td className="p-3 text-slate-400">{d.phone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 10. E'LONLAR PANELI */}
        {activeTab === "announcements" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-4">
              <h2 className="text-lg font-bold text-white">E'lon Joylash</h2>
              <form onSubmit={handleAddAnnouncement} className="space-y-3">
                <input
                  type="text"
                  value={annTitle}
                  onChange={(e) => setAnnTitle(e.target.value)}
                  placeholder="Sarlavha"
                  required
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm"
                />
                <select
                  value={annTarget}
                  onChange={(e) => setAnnTarget(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm"
                >
                  <option value="Hamma uchun">Hamma uchun</option>
                  <option value="O'qituvchilar">O'qituvchilar uchun</option>
                  <option value="Ota-onalar">Ota-onalar uchun</option>
                </select>
                <textarea
                  value={annContent}
                  onChange={(e) => setAnnContent(e.target.value)}
                  placeholder="Matn..."
                  required
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm h-24"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-blue-600 hover:bg-blue-500 rounded-xl text-sm font-medium"
                >
                  Chiqarish
                </button>
              </form>
            </div>
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 lg:col-span-2 space-y-4">
              <h2 className="text-lg font-bold text-white">Faol E'lonlar</h2>
              {announcements.map((a) => (
                <div
                  key={a.id}
                  className="p-4 bg-slate-900 rounded-xl border border-slate-700 space-y-1"
                >
                  <div className="flex justify-between">
                    <h3 className="font-bold text-blue-400">{a.title}</h3>
                    <span className="text-xs text-slate-400">
                      {a.target} | {a.date}
                    </span>
                  </div>
                  <p className="text-sm text-slate-300">{a.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 11. DAVOMAT NAZORATI */}
        {activeTab === "attendance" && (
          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-6">
            <h2 className="text-xl font-bold text-white">
              ⚡ Davomat Nazorati (Eskalatsiya)
            </h2>
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-900 uppercase text-xs text-slate-400">
                <tr>
                  <th className="p-3">Sinf</th>
                  <th className="p-3">Mas'ul O'qituvchi</th>
                  <th className="p-3">Holat</th>
                  <th className="p-3">Vaqt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {attendanceRecords.map((rec) => (
                  <tr key={rec.id}>
                    <td className="p-3 font-bold text-emerald-400">
                      {rec.className}
                    </td>
                    <td className="p-3">{rec.teacher}</td>
                    <td className="p-3">
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">
                        {rec.status}
                      </span>
                    </td>
                    <td className="p-3 font-mono text-xs">{rec.lastUpdated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 12. HISOBOTLAR */}
        {activeTab === "reports" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-slate-800 p-4 rounded-2xl border border-slate-700">
              <h2 className="text-lg font-bold">
                📈 Maktab Statistikasi va Hisobotlar
              </h2>
              <button
                onClick={() =>
                  exportToCSV("reports", [
                    { Teachers: teachers.length },
                    { Students: students.length },
                    { Classes: classes.length },
                  ])
                }
                className="px-4 py-2 bg-blue-600 text-xs rounded-xl hover:bg-blue-500"
              >
                CSV Export
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700">
                <span className="text-xs text-slate-400 uppercase">
                  O'qituvchilar
                </span>
                <div className="text-2xl font-bold">{teachers.length}</div>
              </div>
              <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700">
                <span className="text-xs text-slate-400 uppercase">
                  O'quvchilar
                </span>
                <div className="text-2xl font-bold text-blue-400">
                  {students.length}
                </div>
              </div>
              <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700">
                <span className="text-xs text-slate-400 uppercase">
                  Sinflar
                </span>
                <div className="text-2xl font-bold text-emerald-400">
                  {classes.length}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 13. MAKTAB SOZLAMALARI */}
        {activeTab === "settings" && (
          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 max-w-2xl space-y-6">
            <h2 className="text-xl font-bold text-white">
              ⚙️ Maktab Sozlamalari
            </h2>
            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  Maktab Nomi
                </label>
                <input
                  type="text"
                  value={schoolSettings.name}
                  onChange={(e) =>
                    setSchoolSettings({
                      ...schoolSettings,
                      name: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  Manzili
                </label>
                <input
                  type="text"
                  value={schoolSettings.address}
                  onChange={(e) =>
                    setSchoolSettings({
                      ...schoolSettings,
                      address: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  Telefon
                </label>
                <input
                  type="text"
                  value={schoolSettings.phone}
                  onChange={(e) =>
                    setSchoolSettings({
                      ...schoolSettings,
                      phone: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-sm font-medium"
              >
                Saqlash
              </button>
            </form>
          </div>
        )}

        {/* 14. FAOLLIK TARIXI */}
        {activeTab === "logs" && (
          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-4">
            <h2 className="text-lg font-bold text-white">
              📜 Faollik Tarixi (Audit loglar)
            </h2>
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-900 uppercase text-xs text-slate-400">
                <tr>
                  <th className="p-3">Harakat</th>
                  <th className="p-3">Foydalanuvchi</th>
                  <th className="p-3">Vaqti</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {activityLogs.map((l) => (
                  <tr key={l.id}>
                    <td className="p-3">{l.action}</td>
                    <td className="p-3 text-blue-400">{l.user}</td>
                    <td className="p-3 text-slate-400 text-xs">{l.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
