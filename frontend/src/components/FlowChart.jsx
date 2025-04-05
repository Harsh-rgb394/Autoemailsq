import ReactFlow, {
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
} from "reactflow";
import axios from "axios";
import Modal from "react-modal";
import "reactflow/dist/style.css";
import { useState, useCallback, useEffect } from "react";

// Set the root element for the modal
Modal.setAppElement("#root");

// Custom styles for the modal
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const FlowChart = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [nodeCount, setNodeCount] = useState(1);
  const [selectedNodeType, setSelectedNodeType] = useState("Lead-Source");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [editingNode, setEditingNode] = useState(null);
  // console.log(selectedNodeType);
  // console.log(modalContent);
  // Callback to handle node changes
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  // Callback to handle edge changes
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  // Function to add a new node and connect it to previous node
  const addNode = (label, content) => {
    const newNodeId = (nodeCount + 1).toString();
    const newNode = {
      id: newNodeId,
      data: { label: `${label}\n${content}` },
      position: { x: 100, y: nodeCount * 100 },
    };
    setNodes((nds) => nds.concat(newNode));
    setNodeCount((count) => count + 1);

    const newEdge = {
      id: `${nodeCount}-${newNodeId}`,
      source: `${nodeCount}`,
      target: newNodeId,
    };
    setEdges((eds) => eds.concat(newEdge));
  };

  // Handle the addition of a new node
  const handleAddNode = () => {
    if (selectedNodeType) {
      setModalContent(selectedNodeType);
      setIsOpen(true);
      setEditingNode(null);
    } else {
      alert("Please select a valid node type.");
    }
  };

  // Handle form submission for adding/updating nodes
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const subject = formData.get("subject");
    const text = formData.get("content");
    const delay = formData.get("delay");
    const email = formData.get("email");
    let nodeContent = "";

    if (modalContent === "Cold-Email") {
      nodeContent = `- (${subject}) ${text}`;
    } else if (modalContent === "Wait/Delay") {
      nodeContent = `- (${delay})`;
    } else {
      nodeContent = `- (${email})`;
    }

    // Update the existing node if editing, otherwise add a new node
    if (editingNode) {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === editingNode.id
            ? { ...node, data: { label: `${modalContent}\n${nodeContent}` } }
            : node
        )
      );
    } else {
      if (selectedNodeType === "Lead-Source") {
        setSelectedNodeType("Cold-Email");
      }
      addNode(modalContent, nodeContent);
    }
    setIsOpen(false);
  };

  // Render the modal content based on the selected node type
  const renderModalContent = () => {
    switch (modalContent) {
      case "Cold-Email":
        return (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-sm">
            <label htmlFor="subject" className="font-medium text-[#153448]">
              Subject:
            </label>
            <input
              type="text"
              name="subject"
              id="subject"
              defaultValue={
                editingNode?.data.label.split("- (")[1]?.split(")")[0] || ""
              }
              required
              className="border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#153448]"
            />

            <label htmlFor="content" className="font-medium text-[#153448]">
              Content:
            </label>
            <textarea
              name="content"
              id="content"
              rows="3"
              defaultValue={editingNode?.data.label.split(") ")[1] || ""}
              required
              className="border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#153448]"
            />

            <button
              type="submit"
              className="mt-2 bg-[#153448] text-white py-2 px-4 rounded-md hover:bg-[#1f3e5d] transition"
            >
              {editingNode ? "Update Cold Email" : "Add Cold Email"}
            </button>
          </form>
        );

      case "Wait/Delay":
        return (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-sm">
            <label htmlFor="delay" className="font-medium text-[#153448]">
              Delay Time:
            </label>
            <select
              name="delay"
              id="delay"
              defaultValue={
                editingNode?.data.label.split("- (")[1]?.split(" min")[0] +
                " min" || ""
              }
              required
              className="border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#153448]"
            >
              {[...Array(10).keys()].map((i) => (
                <option key={i} value={`${i + 1} min`}>
                  {i + 1} min
                </option>
              ))}
            </select>

            <button
              type="submit"
              className="mt-2 bg-[#153448] text-white py-2 px-4 rounded-md hover:bg-[#1f3e5d] transition"
            >
              {editingNode ? "Update Delay" : "Add Delay"}
            </button>
          </form>
        );

      case "Lead-Source":
        return (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-sm">
            <label htmlFor="email" className="font-medium text-[#153448]">
              Recipient Email:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              defaultValue={
                editingNode?.data.label.split("- (")[1]?.split(")")[0] || ""
              }
              required
              className="border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#153448]"
            />

            <button
              type="submit"
              className="mt-2 bg-[#153448] text-white py-2 px-4 rounded-md hover:bg-[#1f3e5d] transition"
            >
              {editingNode ? "Update Lead Source" : "Add Lead Source"}
            </button>
          </form>
        );

      default:
        return null;
    }
  };

  // Handle node click to open modal for editing
  const handleNodeClick = (event, node) => {
    setModalContent(node.data.label.split("\n")[0]);
    setIsOpen(true);
    setEditingNode(node);
  };

  // Handle the process start
  const handleStartProcess = async () => {
    const response = await axios.post(
      'http://localhost:5000/api/sequence/create-sq',
      {
        nodes,
        edges,
      }
    );
    if (response.status === 200) {
      alert("Process started successfully");
    } else {
      alert("Error starting process");
    }
  };

  // Add the initial lead-source node on component mount
  useEffect(() => {
    handleAddNode();
  }, []);

  return (

    <div className="w-full h-full mt-6">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={handleNodeClick}
        className="rounded-xl border border-[#153448] bg-[#f3f4f6] shadow-lg"
      >
        <Controls />
        <Background />
      </ReactFlow>

      <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4 mt-6">
        <select
          value={selectedNodeType}
          onChange={(e) => setSelectedNodeType(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#153448]"
        >
          <option value="Cold-Email">Cold Email</option>
          <option value="Wait/Delay">Wait/Delay</option>
        </select>

        <button
          onClick={handleAddNode}
          className="bg-[#153448] text-white px-4 py-2 rounded-md hover:bg-[#1f3e5d] transition"
        >
          Add Node
        </button>

        <button
          onClick={handleStartProcess}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
        >
          Start Process
        </button>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
      >
        <div className="p-4 w-[300px] md:w-[400px]">
          <h2 className="text-xl font-bold text-center text-[#153448] mb-4">
            {editingNode ? "Edit Node" : "Add Node"}
          </h2>
          {renderModalContent()}
        </div>
      </Modal>
    </div>
  );
};

export default FlowChart;
