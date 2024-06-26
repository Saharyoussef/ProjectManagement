"use client"
import DailyTasks from "./_components/DailyTasks";
import ProjectView from "./_components/projectView";
import PageContainer from "./_components/PageContainer";
import { Grid, Box } from '@mui/material';
import Tasks from "./_components/tasks";
import MyContacts from "./_components/Contacts";

const HomePage=()=>{
    
    return(
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

export default HomePage;