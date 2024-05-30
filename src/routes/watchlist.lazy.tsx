// watchlist.jsx
import { createFileRoute, redirect } from '@tanstack/react-router'
import React from 'react';


const Watchlist = React.lazy(() => import('watchlist/Watchlist'))


//AUTHENTICATED ROUTE WITH GUARD
export const Route = createFileRoute('/watchlist')({
    //додати після context.authentication в main.tsx
    beforeLoad: ({ context }) => {
        //add context.authentication in main.tsx
        const { isLogged } = context.authentication;

        if (false) {
            throw redirect({
                to: "/login",
            });
        }
    },
    component: Watchlist,
})