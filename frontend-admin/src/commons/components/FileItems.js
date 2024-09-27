'use client';
import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { FaFile, FaRegWindowClose } from 'react-icons/fa';
const FileItem = styled.li``;

/**
 *
 * fileName
 * seq
 * downloadUrl
 */
const FileItems = ({ files, className, onDelete }) => {
  return (
    files &&
    files.length > 0 && (
      <ul className={className}>
        {files.map(({ fileName, seq, downloadUrl }) => (
          <FileItem key={`file_${seq}`}>
            <FaFile />
            <Link href={downloadUrl}>{fileName}</Link>
            <FaRegWindowClose onClick={() => onDelete(seq)} />
          </FileItem>
        ))}
      </ul>
    )
  );
};
