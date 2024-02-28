# moe.py
import torch
import torch.nn as nn

class MoE(nn.Module):
    def __init__(self, input_size, expert_output_size, num_experts):
        super(MoE, self).__init__()
        self.gate = nn.Linear(input_size, num_experts)
        self.experts = nn.ModuleList([nn.Linear(input_size, expert_output_size) for _ in range(num_experts)])
        
    def forward(self, x):
        gating_distribution = torch.softmax(self.gate(x), dim=1)
        expert_outputs = [expert(x) for expert in self.experts]
        expert_outputs = torch.stack(expert_outputs, dim=1)
        
        output = torch.bmm(gating_distribution.unsqueeze(1), expert_outputs).squeeze(1)
        return output
