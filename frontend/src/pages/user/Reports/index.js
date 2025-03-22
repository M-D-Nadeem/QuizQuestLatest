import React,{useState,useEffect} from 'react'
import PageTitle from '../../../components/PageTitle'
import {Table, message} from 'antd'
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice'
import { useDispatch } from 'react-redux'
import { getAllAttemptsByUser } from '../../../apicalls/reports'
import moment from 'moment'
import jsPDF from 'jspdf';

function ReportsPage() {
  const [reportsData, setReportsData] = useState([])
  const dispatch = useDispatch()
  const columns = [
    {
       title: "Exam Name",
       dataIndex: "examName",
       render: (text,record) => 
        <>{record.exam.name}</>
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (text,record) => 
       <>{moment(record.createdAt).format("DD-MM-YYYY hh:mm:ss")}</>
      
   },
    {
      title: "Total Marks",
      dataIndex: "totalMarks",
      render: (text,record) => 
        <>{record.exam.totalMarks}</>
       
    },
    {
      title: "Passing Marks",
      dataIndex: "passingMarks",
      render: (text,record) => 
        <>{record.exam.passingMarks}</>
       
    },
    {
      title: "Obtained Marks",
      dataIndex: "obtainedMarks",
      render: (text,record) => 
        <>{record.result.correctAnswers.length}</>
       
    },
    {
      title: "Verdict",
      dataIndex: "verdict",
      render: (text,record) => 
        <>{record.result.verdict}</>
    },
    {
      title: "Download Report",
      dataIndex: "download",
      render: (text, record) => (
        <button onClick={() => downloadReport(record)}>Download PDF</button>
      )
    }
  ]
  const downloadReport = (record) => {
    const doc = new jsPDF();
  
    // Set title styles
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 255); // Blue color for title
    doc.text(`Report for ${record.exam.name}`, 10, 10);
  
    // Reset font for subtitle and general text
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0); // Black text
  
    doc.text(`User: ${record.user.name}`, 10, 20);
    doc.text(`Date: ${moment(record.createdAt).format("DD-MM-YYYY hh:mm:ss")}`, 10, 30);
  
    // Underline section for Marks and Verdict
    doc.setFont("helvetica", "bold");
    doc.text(`Total Marks:`, 10, 40);
    doc.setFont("helvetica", "normal");
    doc.text(`${record.exam.totalMarks}`, 50, 40);
  
    doc.setFont("helvetica", "bold");
    doc.text(`Passing Marks:`, 10, 50);
    doc.setFont("helvetica", "normal");
    doc.text(`${record.exam.passingMarks}`, 50, 50);
  
    doc.setFont("helvetica", "bold");
    doc.text(`Obtained Marks:`, 10, 60);
    doc.setFont("helvetica", "normal");
    doc.text(`${record.result.correctAnswers.length}`, 50, 60);
  
    doc.setFont("helvetica", "bold");
    doc.text(`Verdict:`, 10, 70);
    if (record.result.verdict === "Pass") {
      doc.setTextColor(0, 128, 0); // Green for Pass
  } else {
      doc.setTextColor(255, 0, 0); // Red for Fail
  }
    doc.text(`${record.result.verdict}`, 50, 70);
  
    // Reset color for answers section
    doc.setTextColor(0, 0, 0);
    let yOffset = 80; 
  
    // Correct answers
    doc.setFont("helvetica", "bold");
    doc.text("Correct Answers:", 10, yOffset);
    yOffset += 10;
    
    doc.setFont("helvetica", "normal");
    record.result.correctAnswers.forEach((answer, index) => {
      doc.text(`${index + 1}. ${answer.name}`, 10, yOffset);
      yOffset += 10;
      doc.setFont("helvetica", "italic");
      doc.text(`Your Answer: ${answer.options[answer.correctOption]}`, 10, yOffset);
      yOffset += 10;
      doc.setFont("helvetica", "normal");
    });
  
    yOffset += 10; // Add some space before the next section
  
    // Wrong answers with the correct answer
    doc.setFont("helvetica", "bold");
    doc.text("Wrong Answers:", 10, yOffset);
    yOffset += 10;
  
    doc.setFont("helvetica", "normal");
    record.result.wrongAnswers.forEach((answer, index) => {
      doc.text(`${index + 1}. ${answer.name}`, 10, yOffset);
      yOffset += 10;
      doc.setFont("helvetica", "italic");
      doc.text(`Your Answer: ${answer.options[answer.selectedOption]}`, 10, yOffset);
      yOffset += 10;
      doc.setFont("helvetica", "normal");
      doc.text(`Correct Answer: ${answer.options[answer.correctOption]}`, 10, yOffset);
      yOffset += 10;
    });
  
    // Save the document
    doc.save(`Report_${record.exam.name}_${record.user.name}.pdf`);
  };
  const getData = async() => {
     try{
       dispatch(ShowLoading())
       const response = await getAllAttemptsByUser()
       console.log(response);
       
       dispatch(HideLoading())
       if(response.success){
        console.log(response.data);
        setReportsData(response.data)
        
        message.success(response.message)
        
       }
       else{
        message.error(response.message)
       }
     }
     catch(error){
      dispatch(HideLoading())
      message.error(error.message)
     }
  }
  useEffect(()=>{
   getData()
  },[])
  console.log(reportsData)
  return (
    <div>
      <PageTitle title="Reports"/>
      <div className='divider'></div>
      <Table columns={columns} className="mt-2" dataSource={reportsData}/>
      
    </div>
  )
}

export default ReportsPage