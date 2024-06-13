import { OrganizationProfile } from "@clerk/nextjs";

const SettingsPage = () => {
    return (
        <div className="w-full">
            <OrganizationProfile
                routing="hash"
                /*on utilise ici le routage par hachage voir doc pour savoir plus*/
                appearance={{
                    elements: {
                        rootBox: {
                            boxShadow: "none",
                            width: "100%",
                        },
                        card: {
                            border: "1px solid #e5e5e5",
                            boxShadow: "none",
                            width: "100%"
                        }
                    }
                }}
            />
        </div>
    );
};

export default SettingsPage;
