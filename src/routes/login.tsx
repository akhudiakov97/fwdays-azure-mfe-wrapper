import {createFileRoute, useRouter, useNavigate} from "@tanstack/react-router";
import {createClient} from "@supabase/supabase-js";

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY);

export const Route = createFileRoute('/login')({
    component: Login,
});

function Login() {
    const router = useRouter();
    const navigate = useNavigate();

    return (
        <div className="login-container">
            <h2>Login</h2>
            <>
                <h3>Hello user!</h3>
                <button
                    onClick={async () => {
                        const {error} = await supabase.auth.signOut();
                        router.invalidate();
                    }}
                >
                    Sign out
                </button>
            </>
        </div>
    );
}