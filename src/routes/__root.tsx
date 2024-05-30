import {createRootRoute, Link, Outlet} from '@tanstack/react-router';
import {TanStackRouterDevtools} from '@tanstack/router-devtools';
import '../styles.css';
import {useEffect, useState} from "react";
import {Auth} from "@supabase/auth-ui-react";
import {ThemeSupa} from "@supabase/auth-ui-shared";
import {createClient} from "@supabase/supabase-js";

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY);

export const Route = createRootRoute({
    component: () => {
        const [session, setSession] = useState(null)

        useEffect(() => {
            supabase.auth.getSession().then(({data: {session}}) => {
                setSession(session)
            })

            const {
                data: {subscription},
            } = supabase.auth.onAuthStateChange((_event, session) => {
                setSession(session)
            })

            return () => subscription.unsubscribe()
        }, [])

        if (!session) {
            return (<Auth supabaseClient={supabase} appearance={{theme: ThemeSupa}}/>)
        } else {
            return (
                <>
                    <div className="nav-container">
                        <Link to="/" className="[&.active]:font-bold">
                            Home
                        </Link>
                        <Link to="/movies" className="[&.active]:font-bold">
                            Movies
                        </Link>
                        <Link to="/watchlist" className="[&.active]:font-bold">
                            Watchlist
                        </Link>
                        <Link to="/login" className="[&.active]:font-bold">
                            Login
                        </Link>
                    </div>
                    <Outlet/>
                    <TanStackRouterDevtools/>
                </>
            );
        }
    }
});