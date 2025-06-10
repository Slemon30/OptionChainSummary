import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FiRefreshCw, FiTrendingUp, FiTrendingDown, FiBarChart2, FiDollarSign } from 'react-icons/fi';
import { FaBalanceScale } from 'react-icons/fa';

const AppContainer = styled.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  color: #1a1a1a;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  margin-right: 2rem;
  border-bottom: 1px solid #eaeaea;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  color: #1a1a1a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-right: 1rem;
`;

const RefreshButton = styled.button`
  background: #0066ff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  margin-left: 1rem;
  transition: all 0.2s;

  &:hover {
    background: #0052cc;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const SummarySection = styled.section`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 0;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
`;

const SummaryCard = styled.div`
  background: ${props => props.highlight ? '#f8f9ff' : '#f8f9fa'};
  border: 1px solid ${props => props.highlight ? '#d6e0ff' : '#eaeaea'};
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

const CardTitle = styled.div`
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CardValue = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a1a;
`;

const TableContainer = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
  background:rgb(233, 233, 249);
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background:rgb(218, 243, 249);
  }

  &:hover {
    background: #f1f3f9;
  }
`;

const TableHeaderCell = styled.th`
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: #666;
  border-bottom: 1px solidrgb(0, 0, 0);
`;

const TableCell = styled.td`
  padding: 1rem;
  border-bottom: 1px solidrgb(0, 0, 0);
`;

const CallCell = styled(TableCell)`
  color: #00a854;
  font-weight: 500;
`;

const PutCell = styled(TableCell)`
  color: #f44336;
  font-weight: 500;
`;

const StrikeCell = styled(TableCell)`
  font-weight: 600;
  background:rgb(226, 244, 245);
`;

const LoadingText = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
`;

function App() {
  const [optionData, setOptionData] = useState([]);
  const [summary, setSummary] = useState({});
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://127.0.0.1:5000/get_option_data');
        setOptionData(response.data.option_chain);
        setSummary(response.data.summary);
        setLastUpdated(new Date().toLocaleTimeString());
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 100000);
    return () => clearInterval(interval);
  }, []);

  const refreshData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://127.0.0.1:5000/get_option_data');
      setOptionData(response.data.option_chain);
      setSummary(response.data.summary);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppContainer>
      <Header>
        <Title>
          <FiBarChart2 size={24} />
          Option Chain Data
        </Title>
        <RefreshButton onClick={refreshData}>
          <FiRefreshCw size={16} />
          {loading ? 'Loading...' : `Last updated: ${lastUpdated}`}
        </RefreshButton>
      </Header>

      <SummarySection>
        <SectionTitle>
          <FaBalanceScale size={20} />
          Market Summary
        </SectionTitle>
        <SummaryGrid>
          <SummaryCard highlight>
            <CardTitle><FiTrendingUp /> Total Call OI</CardTitle>
            <CardValue>{summary.totalCallOI || '--'}</CardValue>
          </SummaryCard>
          <SummaryCard highlight>
            <CardTitle><FiTrendingDown /> Total Put OI</CardTitle>
            <CardValue>{summary.totalPutOI || '--'}</CardValue>
          </SummaryCard>
          <SummaryCard>
            <CardTitle><FaBalanceScale /> Put/Call Ratio</CardTitle>
            <CardValue>{summary.putToCallRatio || '--'}</CardValue>
          </SummaryCard>
          <SummaryCard>
            <CardTitle><FiDollarSign /> Max Call OI Strike</CardTitle>
            <CardValue>{summary.maxCallOI_StrikePrice || '--'}</CardValue>
          </SummaryCard>
          <SummaryCard>
            <CardTitle><FiDollarSign /> Max Put OI Strike</CardTitle>
            <CardValue>{summary.maxPutOI_StrikePrice || '--'}</CardValue>
          </SummaryCard>
          <SummaryCard highlight>
            <CardTitle><FiBarChart2 /> Max OI Strike</CardTitle>
            <CardValue>{summary.maxOI_StrikePrice || '--'}</CardValue>
          </SummaryCard>
          <SummaryCard>
            <CardTitle><FiBarChart2 /> 2nd Max OI Strike</CardTitle>
            <CardValue>{summary.maxOI_StrikePrice2 || '--'}</CardValue>
          </SummaryCard>
          <SummaryCard>
            <CardTitle><FiBarChart2 /> 3rd Max OI Strike</CardTitle>
            <CardValue>{summary.maxOI_StrikePrice3 || '--'}</CardValue>
          </SummaryCard>
        </SummaryGrid>
      </SummarySection>

      <SectionTitle>
        <FiBarChart2 size={20} />
        Option Chain Data
      </SectionTitle>
      
      <TableContainer>
        {loading ? (
          <LoadingText>Loading option chain data...</LoadingText>
        ) : (
          <Table>
            <TableHeader>
              <tr>
                <TableHeaderCell>Call OI</TableHeaderCell>
                <TableHeaderCell>Call Price</TableHeaderCell>
                <TableHeaderCell>Strike Price</TableHeaderCell>
                <TableHeaderCell>Put Price</TableHeaderCell>
                <TableHeaderCell>Put OI</TableHeaderCell>
                <TableHeaderCell>Call + Put OI</TableHeaderCell>
                <TableHeaderCell>Call - Put OI</TableHeaderCell>
              </tr>
            </TableHeader>
            <tbody>
              {optionData.map((item, index) => (
                <TableRow key={index}>
                  <CallCell>{item[0]}</CallCell>
                  <CallCell>{item[1]}</CallCell>
                  <StrikeCell>{item[2]}</StrikeCell>
                  <PutCell>{item[3]}</PutCell>
                  <PutCell>{item[4]}</PutCell>
                  <TableCell>{item[5]}</TableCell>
                  <TableCell>{item[6]}</TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        )}
      </TableContainer>
    </AppContainer>
  );
}

export default App;