"use client"

import { useState, useEffect } from "react";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { RiSunLine } from "react-icons/ri";
import { useTheme } from "next-themes";

import ToggleButton from '@/components/ToggleButton/ToggleButton';
import { DARK, LIGHT } from "@/constants/const";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ToggleButton onTurnOFF={() => setTheme(LIGHT)} onTurnOn={() => setTheme(DARK)} turnOnIcon={BsFillMoonStarsFill} turnOFFIcon={RiSunLine} />
  );
};

export default ThemeSwitcher;