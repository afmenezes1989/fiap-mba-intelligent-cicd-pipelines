#!/bin/bash

# F1 Classification CI/CD - Quick Setup Script
# This script helps you set up the project quickly

set -e

echo "🏎️  F1 Classification CI/CD - Setup Script"
echo "=========================================="
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check Node.js
echo -e "${BLUE}Checking Node.js...${NC}"
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo -e "${GREEN}✓ Node.js $NODE_VERSION found${NC}"
else
    echo -e "${RED}✗ Node.js not found. Please install Node.js 20.x or higher${NC}"
    exit 1
fi

# Check Python
echo -e "${BLUE}Checking Python...${NC}"
if command -v python3 &> /dev/null; then
    PYTHON_VERSION=$(python3 --version)
    echo -e "${GREEN}✓ $PYTHON_VERSION found${NC}"
else
    echo -e "${RED}✗ Python not found. Please install Python 3.9 or higher${NC}"
    exit 1
fi

# Install Frontend Dependencies
echo ""
echo -e "${BLUE}Installing frontend dependencies...${NC}"
cd frontend
npm install
echo -e "${GREEN}✓ Frontend dependencies installed${NC}"

# Install Backend Dependencies
echo ""
echo -e "${BLUE}Installing backend dependencies...${NC}"
cd ../backend
pip3 install -r requirements.txt
echo -e "${GREEN}✓ Backend dependencies installed${NC}"

# Create .env file if it doesn't exist
cd ..
if [ ! -f .env ]; then
    echo ""
    echo -e "${BLUE}Creating .env file...${NC}"
    cp .env.example .env
    echo -e "${GREEN}✓ .env file created${NC}"
else
    echo -e "${GREEN}✓ .env file already exists${NC}"
fi

# Run tests to verify setup
echo ""
echo -e "${BLUE}Running tests to verify setup...${NC}"

echo -e "${BLUE}Testing backend...${NC}"
cd backend
if pytest -v; then
    echo -e "${GREEN}✓ Backend tests passed${NC}"
else
    echo -e "${RED}✗ Backend tests failed${NC}"
    exit 1
fi

echo ""
echo -e "${BLUE}Testing frontend...${NC}"
cd ../frontend
if npm test; then
    echo -e "${GREEN}✓ Frontend tests passed${NC}"
else
    echo -e "${RED}✗ Frontend tests failed${NC}"
    exit 1
fi

cd ..

echo ""
echo "=========================================="
echo -e "${GREEN}✅ Setup completed successfully!${NC}"
echo ""
echo "Next steps:"
echo ""
echo "  1. Start the backend:"
echo "     cd backend"
echo "     python3 -m uvicorn api.index:app --reload"
echo ""
echo "  2. In another terminal, start the frontend:"
echo "     cd frontend"
echo "     npm run dev"
echo ""
echo "  3. Open http://localhost:3000 in your browser"
echo ""
echo "  4. Read SETUP.md for deployment instructions"
echo ""
echo "🏁 Happy coding!"

