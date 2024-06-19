import { Footer } from "./_components/footer";
import { Navbar } from "./_components/navbar";

const LandingLayout=({children}:{children: React.ReactNode;})=>{
    
    /* Le composant accepte une prop children qui est de type React.ReactNode. 
    children représente le contenu dynamique à insérer dans le layout 
    (par exemple, le contenu spécifique de chaque page). */

    /*({ children }) : Déstructure l'objet des props pour extraire directement children.
    : { children: React.ReactNode } : Définit le type des props déstructurées,
    en spécifiant que children est de type React.ReactNode. */

    return (
        <div className="h-full bg-slate-100">
            <Navbar></Navbar>
            <main className="pt-40 pb-20 bg-slate-100">
                {children}
            </main>  
            <Footer></Footer> 
        </div>
    )
}
export default LandingLayout;

/*{children} est utilisé pour insérer dynamiquement 
le contenu spécifique de chaque page à cet endroit dans la structure.*/