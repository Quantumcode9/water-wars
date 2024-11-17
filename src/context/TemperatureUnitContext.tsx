    // src/context/TemperatureUnitContext.tsx

    'use client';

    import React, { createContext, useContext, useState, useEffect } from 'react';

    interface TemperatureUnitContextType {
    isFahrenheit: boolean;
    setUnit: (value: boolean) => void;
    toggleUnit: () => void;
    isAuto: boolean;
    setIsAuto: (value: boolean) => void;
    }

    const TemperatureUnitContext = createContext<TemperatureUnitContextType>({
    isFahrenheit: true,
    setUnit: () => {},
    toggleUnit: () => {},
    isAuto: true,
    setIsAuto: () => {},
    });

    export const TemperatureUnitProvider = ({ children }: { children: React.ReactNode }) => {
    const [isFahrenheit, setIsFahrenheit] = useState<boolean>(true);
    const [isAuto, setIsAuto] = useState<boolean>(true);

    // Load from localStorage on client-side mount
    useEffect(() => {
        const savedUnit = localStorage.getItem('isFahrenheit');
        if (savedUnit !== null) {
        setIsFahrenheit(JSON.parse(savedUnit));
        }

        const savedIsAuto = localStorage.getItem('isAuto');
        if (savedIsAuto !== null) {
        setIsAuto(JSON.parse(savedIsAuto));
        }
    }, []);

    // Save to localStorage when isFahrenheit changes
    useEffect(() => {
        localStorage.setItem('isFahrenheit', JSON.stringify(isFahrenheit));
    }, [isFahrenheit]);

    // Save to localStorage when isAuto changes
    useEffect(() => {
        localStorage.setItem('isAuto', JSON.stringify(isAuto));
    }, [isAuto]);

    const setUnit = (value: boolean) => {
        setIsFahrenheit(value);
        setIsAuto(false);
    };

    const toggleUnit = () => {
        setIsFahrenheit((prev) => !prev);
        setIsAuto(false);
    };

    return (
        <TemperatureUnitContext.Provider
        value={{ isFahrenheit, setUnit, toggleUnit, isAuto, setIsAuto }}
        >
        {children}
        </TemperatureUnitContext.Provider>
    );
    };

    export const useTemperatureUnit = () => useContext(TemperatureUnitContext);