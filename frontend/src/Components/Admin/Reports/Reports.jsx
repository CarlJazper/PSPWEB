import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardHeader,
  Tabs,
  Tab,
  IconButton,
  Collapse,
  CircularProgress,
  useTheme,
  Paper,
  styled,
} from '@mui/material';
import {
  BarChart as ChartIcon,
  MonitorWeight as GymIcon,
  People as UserIcon,
  AttachMoney as SalesIcon,
  Refresh as RefreshIcon,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';
import LogCharts from './LogCharts';
import UserLog from './UserLogs';
import MembershipSales from './MembershipSales';
import GymMonitoring from './GymMonitoring';

const StyledContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(4),
  background: '#111A24',
  minHeight: '100vh',
  borderRadius: theme.spacing(2),
}));

const HeaderCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  background: '#FFAC1C',
  borderRadius: theme.spacing(2),
  marginBottom: theme.spacing(4),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxShadow: '0 4px 20px 0 rgba(0,0,0,0.1)',
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  minHeight: 60,
  fontWeight: 600,
  fontSize: '0.9rem',
  textTransform: 'none',
  borderRadius: theme.spacing(1),
  margin: theme.spacing(0, 0.5),
  color: '#64748b',
  '&.Mui-selected': {
    color: '#1a237e',
    background: 'rgba(26, 35, 126, 0.1)',
  },
  '&:focus': {
    outline: 'none',
  },
  '&.Mui-focusVisible': {
    outline: 'none',
    backgroundColor: 'rgba(26, 35, 126, 0.05)',
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  background: '#ffffff',
  borderRadius: theme.spacing(2),
  boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)',
  marginBottom: theme.spacing(3),
}));

const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
  background: '#f1f5f9',
  padding: theme.spacing(2),
  '& .MuiCardHeader-title': {
    fontSize: '1.25rem',
    fontWeight: 600,
    color: '#334155',
  },
}));

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`report-tabpanel-${index}`}
      aria-labelledby={`report-tab-${index}`}
      style={{ outline: 'none' }}
      {...other}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

const Report = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [expanded, setExpanded] = useState({
    charts: true,
    gym: true,
    users: true,
    sales: true,
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  const handleExpand = (section) => {
    setExpanded(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const reportSections = [
    {
      id: 'charts',
      title: 'Log Charts',
      icon: <ChartIcon />,
      component: <LogCharts />,
      color: '#2e7d32',
    },
    {
      id: 'users',
      title: 'User Logs',
      icon: <UserIcon />,
      component: <UserLog />,
      color: '#7b1fa2',
    },
    {
      id: 'gym',
      title: 'Gym Monitoring',
      icon: <GymIcon />,
      component: <GymMonitoring />,
      color: '#1565c0',
    },
    {
      id: 'sales',
      title: 'Membership Sales',
      icon: <SalesIcon />,
      component: <MembershipSales />,
      color: '#c62828',
    },
  ];

  return (
    <StyledContainer maxWidth="lg">
      <HeaderCard elevation={0}>
        <Typography 
          variant="h4" 
          sx={{ 
            color: '#000',
            fontWeight: 700,
          }}
        >
          Reports
        </Typography>
        <IconButton 
          onClick={handleRefresh} 
          disabled={isLoading}
          sx={{ 
            color: '#000',
            '&:hover': { 
              background: 'rgba(255,255,255,0.1)',
            },
          }}
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : <RefreshIcon />}
        </IconButton>
      </HeaderCard>

      <Paper 
        sx={{ 
          borderRadius: 2,
          mb: 4,
          background: '#ffffff',
          boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)',
        }}
      >
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          centered
          sx={{
            px: 2,
            py: 1,
            '& .MuiTabs-indicator': {
              height: 3,
              borderRadius: '3px',
              backgroundColor: '#1a237e',
            },
            '& .MuiTabs-flexContainer': {
              justifyContent: 'center',
            },
            '& .MuiButtonBase-root': {
              '&:focus': {
                outline: 'none',
              },
            },
          }}
        >
          {reportSections.map((section, index) => (
            <StyledTab 
              key={section.id}
              icon={React.cloneElement(section.icon, { 
                sx: { color: section.color } 
              })}
              label={section.title}
              id={`report-tab-${index}`}
            />
          ))}
        </Tabs>
      </Paper>

      {reportSections.map((section, index) => (
        <TabPanel key={section.id} value={tabValue} index={index}>
          <StyledCard>
            <StyledCardHeader
              title={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  {React.cloneElement(section.icon, { 
                    sx: { color: section.color, fontSize: 28 } 
                  })}
                  <Typography 
                    variant="h6"
                    sx={{ 
                      color: '#334155',
                      fontWeight: 600,
                    }}
                  >
                    {section.title}
                  </Typography>
                </Box>
              }
              action={
                <IconButton
                  onClick={() => handleExpand(section.id)}
                  sx={{
                    color: '#64748b',
                    transform: expanded[section.id] ? 'rotate(180deg)' : 'rotate(0)',
                    transition: 'transform 0.3s',
                  }}
                >
                  <ExpandMoreIcon />
                </IconButton>
              }
            />
            <Collapse in={expanded[section.id]} timeout="auto" unmountOnExit>
              <CardContent sx={{ p: 3, backgroundColor: '#ffffff' }}>
                {section.component}
              </CardContent>
            </Collapse>
          </StyledCard>
        </TabPanel>
      ))}
    </StyledContainer>
  );
};

export default Report;
