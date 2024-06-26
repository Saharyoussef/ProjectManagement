
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";
import DailyTasks from "./DailyTasks";
import ProjectView from "./projectView";
import PageContainer from "./PageContainer";
import { Grid, Box } from '@mui/material';
import Tasks from "./tasks";
import MyContacts from "./Contacts";

export const HomePage=async()=>{
    const{orgId}=auth();

    if(!orgId){
        redirect("/select-org");
    }
    return (
        <PageContainer>
            <Box mt={3}>
                <Grid container spacing={3}>
                    <Grid item xs={12} lg={4}>
                        <DailyTasks />
                    </Grid>
                    <Grid item xs={12} lg={8}>
                        <ProjectView />
                    </Grid>
                    <Grid item xs={12} lg={8}>
                        <Tasks />
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <MyContacts/>
                    </Grid>

                </Grid>
            </Box>
        </PageContainer>  
        
    );
};
