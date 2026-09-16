'use client';

import { Issue } from '@/app/generated/client';
import { DownloadIcon } from '@radix-ui/react-icons';
import { Button } from '@radix-ui/themes';
import { useState } from 'react';

const ExportPdfButton = ({ issue }: { issue: Issue }) => {
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    setLoading(true);
    try {
      const [{ default: jsPDF }, { default: html2canvas }] = await Promise.all([
        import('jspdf'),
        import('html2canvas'),
      ]);

      const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 48;
      const contentWidth = pageWidth - margin * 2;
      let y = margin;

      // ── Header bar ──────────────────────────────────────────────
      pdf.setFillColor(22, 163, 74); // green-600
      pdf.rect(0, 0, pageWidth, 6, 'F');

      // ── Logo / org name ─────────────────────────────────────────
      pdf.setFontSize(10);
      pdf.setTextColor(107, 114, 128); // gray-500
      pdf.text('Ethio Telecom — Issue Tracker', margin, (y += 20));

      // ── Issue ID + date ──────────────────────────────────────────
      const dateStr = issue.createdAt.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      pdf.setFontSize(9);
      pdf.text(`Issue #${issue.id}  ·  Created ${dateStr}`, margin, (y += 16));

      // ── Divider ──────────────────────────────────────────────────
      pdf.setDrawColor(229, 231, 235); // gray-200
      pdf.line(margin, (y += 8), pageWidth - margin, y);

      // ── Title ────────────────────────────────────────────────────
      pdf.setFontSize(18);
      pdf.setTextColor(17, 24, 39); // gray-900
      pdf.setFont('helvetica', 'bold');
      const titleLines = pdf.splitTextToSize(issue.title, contentWidth) as string[];
      pdf.text(titleLines, margin, (y += 24));
      y += (titleLines.length - 1) * 22;

      // ── Status badge ─────────────────────────────────────────────
      const statusColors: Record<string, [number, number, number]> = {
        OPEN: [220, 252, 231],
        IN_PROGRESS: [254, 249, 195],
        CLOSED: [243, 244, 246],
      };
      const statusTextColors: Record<string, [number, number, number]> = {
        OPEN: [22, 101, 52],
        IN_PROGRESS: [133, 77, 14],
        CLOSED: [75, 85, 99],
      };
      const statusLabel =
        issue.status === 'IN_PROGRESS' ? 'In Progress' :
        issue.status === 'OPEN' ? 'Open' : 'Closed';

      const [br, bg, bb] = statusColors[issue.status] ?? [243, 244, 246];
      const [tr, tg, tb] = statusTextColors[issue.status] ?? [75, 85, 99];
      pdf.setFillColor(br, bg, bb);
      pdf.roundedRect(margin, (y += 12), 72, 18, 4, 4, 'F');
      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(tr, tg, tb);
      pdf.text(statusLabel, margin + 8, y + 12);

      // ── Divider ──────────────────────────────────────────────────
      pdf.setDrawColor(229, 231, 235);
      pdf.line(margin, (y += 28), pageWidth - margin, y);

      // ── Description heading ──────────────────────────────────────
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(55, 65, 81); // gray-700
      pdf.text('Description', margin, (y += 20));

      // ── Render description via html2canvas ───────────────────────
      const descEl = document.getElementById('issue-description');
      if (descEl) {
        const canvas = await html2canvas(descEl, {
          scale: 2,
          useCORS: true,
          backgroundColor: '#ffffff',
        });
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = contentWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        // Paginate if the image is taller than the remaining page space
        let remainingHeight = imgHeight;
        let sourceY = 0;
        const maxBlockHeight = pageHeight - y - margin - 20;

        if (remainingHeight <= maxBlockHeight) {
          pdf.addImage(imgData, 'PNG', margin, (y += 10), imgWidth, imgHeight);
          y += imgHeight;
        } else {
          // Multi-page rendering
          let firstBlock = true;
          while (remainingHeight > 0) {
            const blockH = firstBlock ? maxBlockHeight : pageHeight - margin * 2;
            const sliceRatio = blockH / imgHeight;
            const sliceCanvas = document.createElement('canvas');
            sliceCanvas.width = canvas.width;
            sliceCanvas.height = Math.floor(canvas.height * sliceRatio);
            const ctx = sliceCanvas.getContext('2d')!;
            ctx.drawImage(canvas, 0, sourceY, canvas.width, sliceCanvas.height, 0, 0, canvas.width, sliceCanvas.height);
            pdf.addImage(sliceCanvas.toDataURL('image/png'), 'PNG', margin, firstBlock ? y + 10 : margin, imgWidth, blockH);
            remainingHeight -= blockH;
            sourceY += sliceCanvas.height;
            if (remainingHeight > 0) pdf.addPage();
            firstBlock = false;
            y = margin;
          }
        }
      } else {
        // Plain text fallback
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(55, 65, 81);
        const lines = pdf.splitTextToSize(issue.description, contentWidth) as string[];
        lines.forEach((line) => {
          if (y > pageHeight - margin) { pdf.addPage(); y = margin; }
          pdf.text(line, margin, (y += 14));
        });
      }

      // ── Footer ───────────────────────────────────────────────────
      const totalPages = pdf.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        pdf.setFontSize(8);
        pdf.setTextColor(156, 163, 175); // gray-400
        pdf.text(
          `Page ${i} of ${totalPages}  ·  Ethio Telecom Issue Tracker`,
          margin,
          pageHeight - 20
        );
      }

      const safeTitle = issue.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
      pdf.save(`issue-${issue.id}-${safeTitle}.pdf`);
    } catch (err) {
      console.error('PDF export failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="soft"
      color="gray"
      className="w-full"
      onClick={handleExport}
      disabled={loading}
    >
      <DownloadIcon />
      {loading ? 'Exporting…' : 'Export PDF'}
    </Button>
  );
};

export default ExportPdfButton;
