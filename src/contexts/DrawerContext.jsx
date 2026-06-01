import { createContext, useContext, useState, useCallback } from 'react';

const DrawerContext = createContext(null);

export function DrawerProvider({ children }) {
    const [drawerAberto, setDrawerAberto] = useState(false);

    const abrirDrawer = useCallback(() => setDrawerAberto(true), []);
    const fecharDrawer = useCallback(() => setDrawerAberto(false), []);
    const alternarDrawer = useCallback(() => setDrawerAberto((v) => !v), []);

    return (
        <DrawerContext.Provider value={{ drawerAberto, abrirDrawer, fecharDrawer, alternarDrawer }}>
            {children}
        </DrawerContext.Provider>
    );
}

export function useDrawer() {
    const ctx = useContext(DrawerContext);
    if (!ctx) throw new Error('useDrawer deve ser usado dentro de DrawerProvider');
    return ctx;
}
