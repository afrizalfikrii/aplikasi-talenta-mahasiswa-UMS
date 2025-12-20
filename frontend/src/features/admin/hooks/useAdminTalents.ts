import { useEffect, useState, useCallback } from "react";
import { getAdminTalents } from "../api/admin.talents.api";
import type { AdminTalent } from "../types/talent-admin.types";

export const useAdminTalents = () => {
  const [talents, setTalents] = useState<AdminTalent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // MOCK DATA FOR UI TESTING
    const mockTalents: AdminTalent[] = [
      {
        id: 1,
        name: "Budi Santoso",
        nim: "L200210001",
        email: "l200210001@student.ums.ac.id",
        program_studi: "Informatika",
        skills: ["React", "Python", "Docker"],
        is_active: true,
      },
      {
        id: 2,
        name: "Siti Aminah",
        nim: "L200210002",
        email: "l200210002@student.ums.ac.id",
        program_studi: "Sistem Informasi",
        skills: ["Figma", "UI/UX"],
        is_active: true,
      },
      {
        id: 3,
        name: "Rudi Hartono",
        nim: "L200210003",
        email: "l200210003@student.ums.ac.id",
        program_studi: "Teknik Elektro",
        skills: ["Arduino", "C++"],
        is_active: false,
      },
    ];

    setTalents(mockTalents);
    setLoading(false);
  }, []);

  return { talents, loading, error, refetch: () => { } };
};
